import React, { useState } from 'react';
import Heading from '../../../components/common/Heading';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const CreateNote = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [submitting, setSubmitting] = useState(false)

    async function onSubmit(data) {
        setSubmitting(true)
        const note = { ...data, userEmail: user?.email, userName: user?.displayName }
        // console.log(note);
        try {
            const res = await axiosSecure.post('/notes', note)
            console.log(res.data);
            toast.success('Note Saved')
            reset()
            setSubmitting(false)
        } catch (err) {
            console.error(err);
            setSubmitting(false)
        }

    }

    return (
        <div>
            <Heading heading="Create Notes" />
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg p-2 md:p-4 relative'>
                <input readOnly defaultValue={user?.email} type="email" className='input mb-1 w-full' />
                <div className='flex flex-col bg-base-100'>
                    <textarea required {...register('title')} className='textarea mb-1 text-lg ' placeholder='Title'></textarea>
                    <textarea required {...register('body')} className='textarea min-h-60' placeholder={`Write Something Awesome...\nYou can submit you personal note link`}></textarea>
                </div>
                <div className='text-center mt-3'>
                    <button disabled={submitting} className='btn btn-primary'>Save Note</button>
                </div>
                {submitting && <span className='loading loading-spinner absolute top-1/2 left-1/2'></span>}
            </form>
        </div>
    );
};

export default CreateNote;