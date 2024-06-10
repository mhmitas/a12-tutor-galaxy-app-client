import React, { useState } from 'react';
import Heading from '../../components/common/Heading';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils/axiosInstance';
import { GoArrowDown, GoChevronDown, GoChevronUp } from "react-icons/go";

const Announcements = () => {
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['Announcements'],
        queryFn: async () => {
            const { data } = await axiosInstance('/announcements')
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'Announcements'} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10'>
                {announcements.map(announcement => <AnnouncementCard key={announcement._id} announcement={announcement} />)}
            </div>
        </div>
    );
};

export default Announcements;


//-----------------


function AnnouncementCard({ announcement }) {
    const [slice, setSlice] = useState(84)
    return (
        <div className="card card-compact bg-base-100 shadow-xl rounded-md">
            <figure><img src={announcement?.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{announcement?.title}</h2>
                <p>{announcement?.message?.slice(0, slice)}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => setSlice(slice === 84 ? announcement?.message?.length : 84)} className={`btn btn-ghost btn-sm ${announcement?.message?.length < 84 && 'hidden'}`}>{slice === 84 ? <GoChevronDown size={20} /> : <GoChevronUp size={20} />}</button>
                </div>
            </div>
        </div>
    )
}