import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../../../components/common/Heading';

const UpdateNote = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { id } = useParams()

    // get detail data of the session
    const { data: oldNote = {}, isPending, refetch } = useQuery({
        queryKey: ['update-note', id],
        enabledL: !!id || user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/notes/detail/${id}`)
            // console.log(data);
            return data
        }
    })
    const { title, body, userEmail } = oldNote

    async function onSubmit(data) {
        const updateNote = { ...data }
        try {
            const res = await axiosSecure.patch(`/notes/update/${id}`, updateNote)
            console.log(res.data);
            if (res.data.modifiedCount) {
                toast.success('Note Updated')
                navigate('/dashboard/manage-notes')
                refetch()
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message)
        }
    }

    if (isPending) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading="Update Note" />
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg p-2 md:p-4'>
                <input readOnly defaultValue={user?.email} type="email" className='input mb-1 w-full' />
                <div className='flex flex-col bg-base-100'>
                    <textarea defaultValue={title} {...register('title')} className='textarea mb-1 text-lg ' placeholder='Title'></textarea>
                    <textarea defaultValue={body} {...register('body')} className='textarea min-h-60' placeholder={`Write Something Awesome...\nYou can submit you personal note link`}></textarea>
                </div>
                <div className='text-center mt-3'>
                    <button className='btn btn-primary'>Update Note</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNote;