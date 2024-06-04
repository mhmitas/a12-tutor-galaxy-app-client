import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from "@tanstack/react-query";

const useStudentBookedSessions = () => {
    const axiosSecure = useAxiosSecure()
    const { user, authLoading } = useAuth()

    const { data: bookedSessions = [], isLoading, refetch } = useQuery({
        queryKey: ['bookedSessions', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/${user?.email}`)
            // console.log(data);
            return data
        }
    })

    return [bookedSessions, isLoading, refetch]
};

export default useStudentBookedSessions;