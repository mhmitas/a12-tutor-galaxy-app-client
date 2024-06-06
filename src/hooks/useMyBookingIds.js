import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyBookingIds = () => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    // get booked sessions ids by current user/student
    const { data: bookingIds = [], isPending, refetch } = useQuery({
        queryKey: ['usersBooedIds', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/session-ids/${user?.email}`)
            console.log(data);
            return data
        }
    })

    return [bookingIds, isPending, refetch]
};

export default useMyBookingIds;