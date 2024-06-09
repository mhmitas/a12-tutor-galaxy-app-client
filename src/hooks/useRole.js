import { axiosInstance } from "../utils/axiosInstance";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, authLoading } = useAuth()
    // console.log(user?.email)
    const { data: role = '', isLoading } = useQuery({
        queryKey: ['user-role', user],
        enabled: !authLoading && !!user,
        queryFn: async () => {
            const { data } = await axiosInstance(`/users/role/${user?.email}`)
            console.log(data.role)
            return data.role
        }
    })

    return [role, isLoading]
};

export default useRole;