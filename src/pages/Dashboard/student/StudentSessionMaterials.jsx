import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import StudentMaterialCard from '../../../components/dashboard/cards/StudentMaterialCard';

// Here a student can see a session's all study materials(new)
const StudentSessionMaterials = () => {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['browse-a-sessions-materials', id],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/materials/session/${id}`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={searchParams.get('title')} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {data.length < 1 ?
                    <p className='text-center'>No material available</p> :
                    data.map(data => <StudentMaterialCard material={data} key={data._id} />)
                }
            </div>
        </div>
    );
};

export default StudentSessionMaterials;