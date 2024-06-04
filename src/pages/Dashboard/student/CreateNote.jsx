import React from 'react';
import Heading from '../../../components/common/Heading';
import Container from '../../../components/shared/Container';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const CreateNote = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    async function onSubmit(data) {
        const note = { ...data, userEmail: user?.email, userName: user?.displayName }
        console.log(note);
        try {
            const res = await axiosSecure.post('/notes', note)
            console.log(res.data);
            toast.success('Note Saved')
            reset()
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <Container>
            <Heading heading="Create Notes" />
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg p-2 md:p-4'>
                <input readOnly defaultValue={user?.email} type="email" className='input mb-1 w-full' />
                <div className='flex flex-col bg-base-100'>
                    <textarea {...register('title')} className='textarea mb-1 text-lg ' placeholder='Title'></textarea>
                    <textarea {...register('body')} className='textarea min-h-60' placeholder={`Write Something Awesome...\nYou can submit you personal note link`}></textarea>
                </div>
                <div className='text-center mt-3'>
                    <button className='btn btn-primary'>Save Note</button>
                </div>
            </form>
        </Container>
    );
};

export default CreateNote;