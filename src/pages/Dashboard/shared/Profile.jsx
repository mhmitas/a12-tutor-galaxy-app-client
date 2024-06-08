import React from 'react';
import Heading from '../../../components/common/Heading';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user, authLoading } = useAuth()
    const [role] = useRole()
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings-in-profile', user],
        enabled: !authLoading || !!user,
        queryFn: async () => {
            const { data } = await axiosSecure(`/bookings/${user?.email}?limit=3`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading='Profile' />
            <div className='divider my-0'></div>
            <div className='bg-gray-100'>
                <div className="mx-auto p-5">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-cover bg-center h-40 lg:h-52" style={{ backgroundImage: "url(https://i.ibb.co/fGVzbks/default-learning.jpg)" }}></div>
                        <div className="p-5 pb-0 flex justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white -mt-16">
                                <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt="Profile Picture" />
                            </div>
                        </div>
                        <div className="text-center mt-5 relative ">
                            <button className='absolute -bottom-4 right-8 btn btn-sm'><FaEdit /></button>
                            <h1 className="text-3xl font-bold text-gray-900">{user?.displayName}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <p className="mt-2 text-gray-600"></p>
                        </div>
                        <div className="p-5 mt-8">
                            <div>
                                {/* social links */}
                                {/* <div className="flex justify-center space-x-4">
                            </div> */}

                                {/* <div className="mt-5">
                                <h2 className="text-xl font-semibold text-gray-800">Bio</h2>
                                <p className="mt-2 text-gray-600">...</p>
                            </div> */}
                            </div>
                            {role === 'student' &&
                                <div className="mt-5">
                                    <h2 className="text-xl font-semibold text-gray-800">Recently Joined</h2>
                                    <ul className="mt-2 space-y-2">
                                        {bookings.map(booking => <li
                                            key={booking._id}
                                            className="bg-gray-100 p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-gray-800">{booking?.session_title}</h3>
                                            <p className="text-gray-600">{format(booking.bookingDate, 'dd MMM yyyy')}</p>
                                        </li>)}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;