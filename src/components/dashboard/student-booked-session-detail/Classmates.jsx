import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import ClassmatesModal from '../modals/ClassmatesModal';

const Classmates = ({ sessionId }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [showClassmatesModal, setShowClassmatesModal] = useState(false)

    // all students booked session
    const { data: classmates = [], isLoading } = useQuery({
        queryKey: ['classmates', sessionId],
        enabled: !!sessionId,
        queryFn: async () => {
            const { data } = await axiosSecure(`/bookings/all-students/${sessionId}`)
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>loading...</span>
    }

    return (
        <div>
            <div className='flex items-center gap-3'>
                <p>Your classmates</p>
                <div onClick={() => setShowClassmatesModal(true)} className="avatar-group -space-x-3 rtl:space-x-reverse btn btn-sm btn-ghost p-0">
                    {
                        classmates.map(classmate => <Avatar key={classmate.email} classmate={classmate} />)
                    }
                    {classmates?.length > 2 && <div className="avatar placeholder">
                        <div className="w-6 bg-neutral text-neutral-content">
                            <span>+{classmates?.length - 3}</span>
                        </div>
                    </div>}
                </div>
            </div>
            {showClassmatesModal && <ClassmatesModal classmates={classmates} setShowModal={setShowClassmatesModal} />}
        </div>
    );
};

export default Classmates;


// ----------------


function Avatar({ classmate }) {
    return (
        <div
            className="avatar">
            <div className="w-6 rounded">
                <img src={classmate?.image || 'https://i.ibb.co/tY0hxsg/default-profile.jpg'} alt="Tailwind-CSS-Avatar-component" />
            </div>
        </div>
    )
}