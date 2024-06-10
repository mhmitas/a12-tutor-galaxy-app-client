import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import useGetQuery from '../../../hooks/useGetQuery';

const TutorActiveSessionsSection = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [limit, setLimit] = useState(4)

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['tutor-active-sessions', limit],
        queryFn: async () => {
            const { data } = await axiosSecure(`/study-sessions/tutor/${user?.email}?status=approved&limit=${limit}`)
            console.log(data);
            return data
        }
    })
    // get total session count
    const [totalSessions, countLoading] = useGetQuery('tutor-totalSessions', `/study-sessions/tutor/count/${user?.email}`)
    // console.log(totalSessions);

    if (isLoading || countLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='my-10'>
            <h3 className='text-2xl font-semibold mb-4'>Active Sessions: {totalSessions?.total}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {sessions.map(session => <TutorActiveSessionsSectionCard key={session._id} session={session} />)}
            </div>
            {isLoading && <span className={`loading loading-spinner mx-auto `}></span>}
            <div className='my-8'>
                <div className='flex justify-center'><button onClick={() => setLimit(limit === 4 ? 0 : 4)} className={`btn btn-primary btn-sm btn-outline `}>{limit === 4 ? <GoChevronDown size={30} /> : <GoChevronUp size={30} />}</button></div>
            </div>
        </div>
    );
};

export default TutorActiveSessionsSection;


function TutorActiveSessionsSectionCard({ session }) {
    return (
        <div className="card bg-base-100 card-compact shadow-xl rounded-md">
            <figure><img src={session?.thumbnail_image || 'https://i.ibb.co/fGVzbks/default-learning.jpg'} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{session.session_title?.slice(0, 28)}</h2>
                <p></p>
                <div className="card-actions justify-end mt-2">
                    <button className="btn btn-primary w-full btn-sm rounded-md">Manage Session</button>
                </div>
            </div>
        </div>
    )
}