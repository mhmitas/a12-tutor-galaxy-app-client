import React, { useState } from 'react';
import uploadImage from '../../../utils/uploadImage';
import { GoX } from 'react-icons/go';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AdminAnnouncementModal = ({ setShowModal }) => {
    const [submitting, setSubmitting] = useState(false)
    const axiosSecure = useAxiosSecure()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        const form = e.target
        const title = form.title.value
        const message = form.message.value;
        let image = 'https://i.ibb.co/XZm4ftj/announcment-image.jpg'
        // post announcement
        try {
            if (form.image_file.files[0]) {
                image = await uploadImage(form.image_file.files[0])
            }
            const announcement = { title, message, image }
            // console.log({ title, message, image });
            const { data } = await axiosSecure.post(`/api/admin/announcement`, announcement)
            console.log(data);
            if (data.insertedId) {
                toast.success('Announcement Published')
                e.target.reset()
            }
            setShowModal(false)
            setSubmitting(false)
        } catch (err) {
            setSubmitting(false)
            console.error(err);
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50'>
            <div className="shadow-xl md:p-10 p-5 bg-base-100 w-full max-w-lg rounded-md mx-auto relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center">Create Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label" htmlFor="title">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Upload Image</span>
                        </div>
                        <input name='image_file' type="file" className="file-input file-input-bordered w-full" />
                    </label>
                    <div className="form-control pb-2">
                        <label className="label" htmlFor="message">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            id="message"
                            name='message'
                            className="textarea textarea-bordered w-full"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <button disabled={submitting} type="submit" className="btn btn-primary w-full">
                            {submitting ? <span className="loading loading-spinner"></span> : 'Create Announcement'}
                        </button>
                    </div>
                </form>
                <button onClick={() => setShowModal(false)} className="btn btn-sm hover:btn-error absolute top-1 right-1 btn-circle" ><GoX size={19} /></button>
            </div>
        </div>
    );
};

export default AdminAnnouncementModal;