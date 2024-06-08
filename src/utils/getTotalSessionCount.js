import axios from 'axios';
import { useEffect, useState } from 'react';

const useTotalSessionCount = async () => {
    const [countLoading, setCountLoading] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCountLoading(true)
        async function fetchData() {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}/total-sessions`)
                console.log(data)
                setCount(data.totalSessions)
            } catch (err) {
                console.error(err);
            }
        }
    }, [])
    // console.log(data)
    return [count, countLoading]
};

export default useTotalSessionCount;