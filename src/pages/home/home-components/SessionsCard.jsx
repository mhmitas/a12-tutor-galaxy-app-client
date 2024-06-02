import React from 'react';

const SessionsCard = ({ session }) => {
    const { session_title, thumbnail_image, } = session
    return (
        <>
            <div className="card bg-base-100 shadow-lg rounded-md relative">
                <span className='badge-secondary font-semibold badge py-3 rounded-sm  absolute top-1 right-1'>Ongoing</span>
                <figure><img className='rounded-md' src={thumbnail_image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{session_title}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Read More</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SessionsCard;