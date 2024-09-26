import React from 'react';
import { differenceInCalendarDays, format, isBefore, isEqual } from "date-fns";
import { Link } from 'react-router-dom';

const SessionsCard = ({ session }) => {
    const { session_title, thumbnail_image, session_description } = session

    const regStartDate = session.registrationDuration.regStart;
    const regEndDate = session.registrationDuration.regEnd;

    let dateValidation
    if (regEndDate && regStartDate) {
        dateValidation = differenceInCalendarDays(
            new Date(regEndDate),
            new Date(),
        )
        // console.log(session?.session_title, result);
    }


    return (
        <div className="card bg-base-100 shadow-md duration-300 rounded-md overflow-hidden relative group cursor-default">
            <figure className=' aspect-video flex items-center justify-center overflow-hidden bg-black'><img className='w-full group-hover:scale-[1.03] duration-500' src={thumbnail_image} alt="session image" /></figure>

            <div className="card-body p-4">
                <h2 className="card-title line-clamp-2">{session_title}</h2>
                <h3 className='line-clamp-2'>{session_description}</h3>
                <div className="card-actions justify-end mt-auto">
                    <Link to={`/detail/${session?._id}`}>
                        <button className="bg-primary hover:bg-primary/90 px-4 py-2 text-primary-content rounded-md font-medium text-sm">Show Details</button>
                    </Link>
                </div>
            </div>
            <div className={`badge ${dateValidation < 0 ? '' : 'badge-success'} font-semibold py-3 rounded-sm  absolute top-1 right-1`}>{dateValidation < 0 ? 'Registration: Closed' : 'Registration: Ongoing'}</div>
        </div>

    );
};

export default SessionsCard;