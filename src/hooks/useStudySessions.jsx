import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStudySessions = (limit = 0, status = '', key = 'sessions') => {
    const axiosSecure = useAxiosSecure()
    const { data: sessions = [], isLoading, error } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions?limit=${limit}&status=${status}`)
            return data
        }
    })
    return [sessions, isLoading, error]
};

export default useStudySessions;