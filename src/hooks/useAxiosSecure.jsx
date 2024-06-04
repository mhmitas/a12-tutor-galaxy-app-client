import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_URL
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { signOutUser } = useAuth()

    axiosSecure.interceptors.request.use(
        function (request) {
            const token = localStorage.getItem('access-token')
            request.headers.Authorization = token ? `Bearer ${token}` : ''
            return request
        }
    )

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            function (res) {
                return res
            },
            async function (error) {
                console.log('Error tracked in the interceptor:', error.response);
                if (error.response.status === 401 || error.response.status === 403) {
                    await signOutUser()
                    navigate('/')
                }
                return Promise.reject(error);
            }
        )
    }, [signOutUser, navigate])

    return axiosSecure
};

export default useAxiosSecure;