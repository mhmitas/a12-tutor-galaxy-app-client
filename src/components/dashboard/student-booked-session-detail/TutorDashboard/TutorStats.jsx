import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import useGetQuery from '../../../../hooks/useGetQuery';
import { FaStar } from "react-icons/fa";

const TutorStats = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const [students, isLoading] = useGetQuery('tutor-stats', `/api/tutor/total-students/${user?.email}`)
    const [avgRating, reviewLoading] = useGetQuery('tutor-avgRating', `/api/tutor/ratings/${user?.email}`)
    const [revenue] = useGetQuery('tutor-revenue', `/api/tutor/revenue/${user?.email}`);


    if (isLoading, reviewLoading) {
        return <div className="skeleton w-full h-28"></div>
    }

    return (
        <div>
            <div className="stats stats-vertical md:stats-horizontal shadow w-full rounded-md">

                <div className="stat text-center">
                    <div className="stat-title">Total Students</div>
                    <div className="stat-value">{students.length}</div>
                </div>
                <div className="stat text-center">
                    <div className="stat-title">Average Ratings</div>
                    <div className="stat-value">
                        <span className='flex justify-center items-center gap-2'><FaStar className='text-warning' />{avgRating[0]?.averageRating}</span>
                    </div>
                </div>
                <div className="stat text-center">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${revenue?.revenue}</div>
                </div>
            </div>
        </div>
    );
};

export default TutorStats;