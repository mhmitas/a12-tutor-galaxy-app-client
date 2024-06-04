import React, { useState } from 'react';
import NoteDetailModal from '../modals/NoteDetailModal';
import askConfirm from '../../modals/confirm-modal/AskConfirm';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'

const NoteCard = ({ note, refetch }) => {
    const [showModal, setShowModal] = useState(false)
    const axiosSecure = useAxiosSecure()

    async function handleDelete(id) {
        try {
            const ask = await askConfirm('Are you sure? You want to delete this note')
            if (!ask) { return }
            const res = await axiosSecure.delete(`/notes/${id}`)
            console.log(res.data);
            toast.success('Note Deleted')
            refetch()
            setShowModal(false)
        } catch (err) {
            console.error(err);
            setShowModal(false)
        }
    }
    async function handleUpdate(id) {
        console.log(id, 'ke Update koro');
    }

    return (
        <>
            <div title='Click to see' onClick={() => setShowModal(true)} className="card card-compact max-w-96 bg-base-100 shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.01] duration-200">
                <div className="card-body">
                    <h2 className="card-title">{note?.title.slice(0, 30)}{note?.title?.length > 30 && '...'}</h2>
                    <p>{note?.body.slice(0, 177)}{note?.body.length > 177 && '...'}</p>
                </div>
            </div>
            {showModal && <NoteDetailModal handleDelete={handleDelete} handleUpdate={handleUpdate} note={note} setShowModal={setShowModal} />}
        </>
    );
};

export default NoteCard;