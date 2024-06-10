import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Heading from '../../../components/common/Heading';
import UploadMaterialRow from '../../../components/table-rows/UploadMaterialRow';

const UploadMaterials = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['approved-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}?status=approved`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-2 min-h-screen'>
            <Heading heading='Upload Materials' />
            <div className="overflow-x-auto bg-base-100">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Title</th>
                            <th>Upload Materials</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map((session, idx) => <UploadMaterialRow session={session} key={session._id} idx={idx} />)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UploadMaterials;