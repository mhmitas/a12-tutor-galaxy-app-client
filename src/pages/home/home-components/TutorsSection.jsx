import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../utils/axiosInstance';
import Heading from '../../../components/common/Heading';
import { scrollLeft, scrollRight } from '../../../utils/scroll';
import { } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const TutorsSection = () => {

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/api/home/tutors')
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className=' relative'>
            <Heading heading={'Our Dedicated Tutors'} />
            <div onClick={scrollRight} className='rounded-xl shadow-md' >
                <div className='bg-base-100 flex   overflow-x-auto gap-4' id='scrollContainer'>
                    {tutors.map(tutor => <TutorCard tutor={tutor} key={tutor?._id} />)}
                </div>
            </div>
            <button className='btn btn-circle absolute top-1/2 left-4' onClick={scrollLeft}><FaArrowLeft size={25} /> </button>
            <button className='btn btn-circle absolute top-1/2 right-4' onClick={scrollRight}><FaArrowRight size={25} /> </button>
        </div>
    );
};

export default TutorsSection;



// ----------------



function TutorCard({ tutor }) {
    return (
        <div className="card min-h-full bg-base-100 border-base-300 border rounded-md ">
            <div className='w-60 h-full'>
                <figure className='aspect-square'><img className='w-full ' src={tutor?.image || 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt={tutor?.name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {tutor.name}</h2>
                    <p>Email: {tutor?.email}</p>
                </div>
            </div>
        </div>
    )
}