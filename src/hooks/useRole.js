import { axiosInstance } from "../utils/axiosInstance";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, authLoading } = useAuth()

    const { data: role = '', isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !authLoading || !!user?.email,
        queryFn: async () => {
            const { data } = await axiosInstance(`/users/role/${user?.email}`)
            // console.log(data.role)
            return data.role
        }
    })

    return [role, isLoading]
};

export default useRole;