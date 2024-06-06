import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import { Link } from 'react-router-dom';

const AllMaterialsOfTutor = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: sessions = [] } = useQuery({
        queryKey: ['approved-sessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}?status=approved`)
            // console.log(data);
            return data
        }
    })


    return (
        <div>
            <Heading heading={'All Materials'} />
            <div className="overflow-x-auto bg-base-100">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-base-300'>
                        <tr>
                            <th>#</th>
                            <th>Session title</th>
                            <th>Click to view</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, idx) => <AllMaterialsOfTutorRow session={session} key={session._id} idx={idx} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMaterialsOfTutor;


// ---------------------


const AllMaterialsOfTutorRow = ({ session, idx }) => {
    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session?.session_title}</td>
            <td>
                <Link to={`/dashboard/tutor/view-all-materials/${session._id}?title=${session?.session_title}`}><button className='btn btn-sm btn-neutral'>View materials</button></Link>
            </td>
        </tr>
    );
};
