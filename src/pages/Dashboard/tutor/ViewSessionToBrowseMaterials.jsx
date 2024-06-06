import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import UploadMaterialRow from '../../../components/table-rows/UploadMaterialRow';
import { Link } from 'react-router-dom';

const ViewSessionsToBrowseMaterials = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [] } = useQuery({
        queryKey: ['approved-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}?status=approved`)
            console.log(data);
            return data
        }
    })

    return (
        <div className='p-2 bg-base-100 min-h-screen'>
            <Heading heading='View All Materials' />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>#</th>
                            <th>Session title</th>
                            <th>Click to see materials</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sessions.map((session, idx) => <ViewSessionsToBrowseMaterialsRow session={session} key={session._id} idx={idx} />)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewSessionsToBrowseMaterials;


//---------------

function ViewSessionsToBrowseMaterialsRow({ session, idx }) {
    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session?.session_title}</td>
            <td>
                <Link to={`/dashboard/view-all-materials/${session?._id}?title=${session?.session_title}`}><button className='btn btn-sm btn-primary'>View Materials</button></Link>
            </td>
        </tr>
    )
}