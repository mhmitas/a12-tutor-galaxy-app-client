import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetQuery = (queryKey, endpoint) => {
    const { user, authLoading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data = [], isLoading, refetch, error } = useQuery({
        queryKey: [queryKey, user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(endpoint)
            return data
        }
    })

    return [data, isLoading, refetch, error]
};

export default useGetQuery;