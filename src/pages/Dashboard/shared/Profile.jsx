import React, { useState } from 'react';
import Heading from '../../../components/common/Heading';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { FaEdit } from "react-icons/fa";
import UpdateProfile from '../../../components/profile/UpdateProfile';

const Profile = () => {
    const { user, authLoading } = useAuth()
    const [role, isRoleLoading] = useRole()
    const axiosSecure = useAxiosSecure()
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings-in-profile', user?.email],
        enabled: role === 'student',
        queryFn: async () => {
            const { data } = await axiosSecure(`/bookings/${user?.email}?limit=3`)
            return data
        }
    })

    const { data: userData = {}, isLoading: userDataLoading } = useQuery({
        queryKey: ['update-profile-data', user],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/role/${user?.email}?a=b`)
            console.log(data);
            return data
        }

    })

    if (isLoading || isRoleLoading || authLoading || userDataLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading='Profile' />
            <div className='divider my-0'></div>
            <div className='bg-base-200'>
                <div className="mx-auto p-5">
                    <div className="bg-base-200 rounded-lg shadow-xl overflow-hidden">
                        <div className="bg-cover bg-center h-40 lg:h-52" style={{ backgroundImage: "url(https://i.ibb.co/fGVzbks/default-learning.jpg)" }}></div>
                        <div className="p-5 pb-0 flex justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white -mt-16">
                                <img src={userData?.image || user?.photoURL || 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt="Profile Picture" />
                            </div>
                        </div>
                        <div className="text-center mt-5 relative ">
                            <button onClick={() => setShowUpdateForm(true)} className='absolute -bottom-4 right-8 btn btn-sm'><FaEdit /></button>
                            <h1 className="text-3xl font-bold">{userData?.name}</h1>
                            <p className="">{userData?.email}</p>
                            <p className="">{role} at TutorGalsxy</p>
                        </div>
                        {showUpdateForm &&
                            <div className='my-8'>
                                <UpdateProfile setShowUpdateForm={setShowUpdateForm} />
                            </div>
                        }
                        <div className="p-5 mt-8">
                            {role === 'student' &&
                                <div className="mt-5">
                                    <h2 className="text-xl font-semibold ">Recently Joined</h2>
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