import { axiosInstance } from "./axiosInstance";

const saveUserInDb = async (user) => {
    const userInfo = {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        role: user?.role,
        status: 'verified'
    }
    try {
        const { data } = await axiosInstance.post('/users', userInfo)
        console.log(data)
    } catch (err) {
        console.error(err);
    }
};

export default saveUserInDb;