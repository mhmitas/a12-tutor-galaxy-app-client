import React from 'react';
import useGetQuery from '../../../hooks/useGetQuery';
import useAuth from '../../../hooks/useAuth';
import Heading from '../../../components/common/Heading';
import NoteCard from '../../../components/dashboard/cards/NoteCard';

const ManageNotes = () => {
    const { user } = useAuth()
    const [data, isLoading, refetch] = useGetQuery('manage-notes', `/notes/${user?.email}`)
    // console.log(data);

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'Manage Notes'} />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10'>
                {data.map(note => <NoteCard note={note} key={note._id} refetch={refetch} />)}
            </div>
        </div>
    );
};

export default ManageNotes;

