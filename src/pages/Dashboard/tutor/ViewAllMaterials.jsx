import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import ViewAllMaterialsRow from '../../../components/table-rows/ViewAllMaterialsRow';
import askConfirm from '../../../components/modals/confirm-modal/AskConfirm';
import toast from 'react-hot-toast'

const ViewAllMaterials = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: materials = [], isLoading, refetch } = useQuery({
        queryKey: ['all-study-materials', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/materials/tutor/${user?.email}`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    console.log(materials);

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this material')
            if (!ask) { return };
            const { data } = await axiosSecure.delete(`/materials/delete/${id}`)
            console.log(data);
            toast.success('Successfully Deleted')
            refetch()
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='p-2'>
            <Heading heading="View All Materials" />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {materials.map((material, idx) => <ViewAllMaterialsRow
                    material={material}
                    key={material._id}
                    handleDelete={handleDelete}
                    refetch={refetch}
                />)}
            </div>
            {/* ------------------ */}
            {/* <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material, idx) => <ViewAllMaterialsRow
                            material={material}
                            key={material._id}
                            idx={idx}
                        />)}
                    </tbody>
                </table>

            </div> */}
        </div>
    );
};

export default ViewAllMaterials;