import React from 'react';
import { format, isBefore, isEqual } from "date-fns";
import { Link } from 'react-router-dom';

const SessionsCard = ({ session }) => {
    const { session_title, thumbnail_image, } = session

    // TODO: COMPARE BETWEEN DATES AND SHOW RESULT
    //```````````````````````````````````````````````
    // console.log(session_title, 'regEndDate:', session.registrationDuration.regEnd, 'today:', new Date());

    // const regStartDate = session.registrationDuration.regStart;
    // const regEndDate = session.registrationDuration.regEnd;
    // const result = isBefore(new Date(), new Date(regEndDate))
    // const result2 = isEqual(new Date(), new Date(regEndDate))
    // console.log(session_title, 'isBefore:', result);
    // console.log(session_title, regEndDate);

    return (
        <div className="card bg-base-100 shadow-lg rounded-md relative">
            <span className='badge-secondary font-semibold badge py-3 rounded-sm  absolute top-1 right-1'>Registration: Ongoing</span>
            <figure><img className='rounded-md' src={thumbnail_image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{session_title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link to={`/detail/${session?._id}`}>
                        <button className="btn btn-primary">Read More</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default SessionsCard;

// first date: 5 jun (today)
// second date: 7 jun
// i will see is the first date before than the second date