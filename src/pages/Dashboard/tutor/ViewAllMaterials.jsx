import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../components/common/Heading';
import StudentMaterialCard from '../../../components/dashboard/cards/StudentMaterialCard';
import { FaPlus } from "react-icons/fa";
import StudyMaterialCard from '../../../components/dashboard/cards/StudyMaterialCard';

const ViewMaterialsTutor = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()

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

    return (
        <div>
            <Heading heading={searchParams.get('title')} subHeading={'All Materials'} />
            {/* <div className='flex justify-end'>
                <button className='btn btn-primary btn-sm btn-circle'><FaPlus size={18} /></button>
            </div> */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {data.length < 1 ?
                    <p className='text-center'>No material available</p> :
                    data.map(material => <StudyMaterialCard material={material} key={material._id} refetch={refetch} />)
                }
            </div>
        </div>
    );
};

export default ViewMaterialsTutor;