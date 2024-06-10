import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../utils/axiosInstance';
import Heading from '../../../components/common/Heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';


const TutorsSection = () => {
    const axiosSecure = useAxiosSecure()

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
        <div>
            <Heading heading={'Our Dedicated Tutors'} />
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {tutors.map(tutor => <TutorCard tutor={tutor} key={tutor?.email} />)}
            </div> */}
            <div className='rounded-xl shadow-xl' >
                <div className=''>
                    <Swiper
                        className=''
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        // loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >

                        {tutors.map(tutor => <SwiperSlide key={tutor?.email}
                            className='p-4'>
                            <TutorCard tutor={tutor} />
                        </SwiperSlide>)}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TutorsSection;



// ----------------



function TutorCard({ tutor }) {
    return (
        <div className="card card-compact max-w-72 h-full bg-base-100 shadow-xl rounded-md ">
            <figure className='aspect-square'><img className='w-full ' src={tutor?.image || 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt={tutor?.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">Name: {tutor.name}</h2>
                <p>Email: {tutor?.email}</p>
            </div>
        </div>
    )
}