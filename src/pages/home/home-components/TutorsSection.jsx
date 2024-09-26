import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../utils/axiosInstance';
import Heading from '../../../components/common/Heading';
import { scrollLeft, scrollRight } from '../../../utils/scroll';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
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

    return (
        <div className='relative'>
            <Heading heading={'Our Dedicated Tutors'} />
            <div onClick={scrollRight} className='rounded-xl shadow-md overflow-hidden p-3 bg-base-100' >
                {isLoading ?
                    (
                        <div className="flex justify-center items-center h-full min-h-96">
                            <div className="loading loading-lg spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='bg-base-100 flex   overflow-x-auto gap-4' id='scrollContainer'>
                            {tutors.map(tutor => <TutorCard tutor={tutor} key={tutor?._id} />)}
                        </div>
                    )
                }
            </div>
            <button className='btn btn-circle btn-sm sm:btn-md border-none absolute top-1/2 left-4 bg-opacity-50' onClick={scrollLeft}><GoChevronLeft size={25} /> </button>
            <button className='btn btn-circle btn-sm sm:btn-md border-none absolute top-1/2 right-4 bg-opacity-50' onClick={scrollRight}><GoChevronRight size={25} /> </button>
        </div>
    );
};

export default TutorsSection;



// ----------------



function TutorCard({ tutor }) {
    const { name, email, image } = tutor;

    return (
        <div className="card min-h-full bg-base-100 border-base-300 border rounded-md shadow-md">
            <div className='w-64 h-full'>
                <figure className='aspect-square bg-black rounded-md overflow-hidden flex items-center justify-center'><img className='w-full ' src={image || 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt={name} /></figure>
                <div className="card-body p-4">
                    <h2 className="card-title">Name: {name}</h2>
                    <p>Email: {email}</p>
                </div>
            </div>
        </div>
    )
}