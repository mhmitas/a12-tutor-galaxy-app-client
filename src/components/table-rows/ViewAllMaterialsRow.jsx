import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ViewAllMaterialsRow = ({ material, idx }) => {
    const axiosSecure = useAxiosSecure()
    ////////////////////////////////////
    //| TODO: MUST CHANGE DATA LOADING
    //| METHOD. JUST LOAD THOSE FIELDS
    //| WHICH NEED:
    //`````````````````````````````````
    const { data = {}, isPending: dataLoading, error } = useQuery({
        queryKey: ['session-for-materials', material?.sessionId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/study-sessions/${material?.sessionId}`)
            console.log(data);
            return data
        }
    })
    const { session_title, thumbnail_image, tutor_email, tutor_name } = data;

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{session_title}</td>
            <td>Job</td>
            <td>Favorite Color</td>
        </tr>
    );
};

export default ViewAllMaterialsRow;