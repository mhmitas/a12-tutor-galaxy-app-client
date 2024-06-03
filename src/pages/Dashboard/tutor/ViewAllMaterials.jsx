import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import ViewAllMaterialsRow from '../../../components/table-rows/ViewAllMaterialsRow';

const ViewAllMaterials = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: materials = [], isLoading } = useQuery({
        queryKey: ['all-study-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/materials/tutor/${user?.email}`)
            console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-2 bg-base-100 min-h-screen'>
            <Heading heading="View All Materials" />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
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

            </div>
        </div>
    );
};

export default ViewAllMaterials;