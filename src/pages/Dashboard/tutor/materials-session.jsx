import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import TutorHandleMaterialCard from '../../../components/dashboard/cards/TutorHandleMaterialCard';
import Heading from '../../../components/common/Heading';

const SessionsMaterial = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()

    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    // in server as students and teachers are calling same api to see study materials i should THINK ABOUT IT ['/materials/session/]
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['get-a-sessions-materials', id],
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
            <Heading heading={searchParams.get('title')} subHeading={'All Materials'} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {data.length < 1 ?
                    <p className='text-center'>No material available</p> :
                    data.map(material => <TutorHandleMaterialCard material={material} key={material._id} refetch={refetch} />)
                }
            </div>
        </div>
    );
};

export default SessionsMaterial;