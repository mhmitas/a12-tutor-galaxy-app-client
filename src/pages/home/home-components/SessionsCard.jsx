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
        <div className="card bg-base-100 shadow-lg rounded-md relative">

            <span className={`badge ${dateValidation < 0 ? '' : 'badge-success'} font-semibold py-3 rounded-sm  absolute top-1 right-1`}>{dateValidation < 0 ? 'Registration: Closed' : 'Registration: Ongoing'}</span>

            <figure><img className='rounded-md' src={thumbnail_image} alt="session image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{session_title} </h2>
                <p>{session_description?.slice(0, 50)}{session_description.length > 50 && '...'}</p>
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

// // TODO: COMPARE BETWEEN DATES AND SHOW RESULT
// //```````````````````````````````````````````````
// // console.log(session_title, 'regEndDate:', session.registrationDuration.regEnd, 'today:', new Date());

// const regStartDate = session.registrationDuration.regStart;
// const regEndDate = session.registrationDuration.regEnd;
// // const result = isBefore(new Date(), new Date(regEndDate))
// const result2 = isEqual(new Date(), new Date(regEndDate))
// console.log(new Date(), new Date(regEndDate));
// // console.log(session?.session_title, 'result2:', result2);

{/* <p>If a dog chews shoes whose shoes does he choose?</p>
                <p>RegStart: {session.registrationDuration.regStart && format(session.registrationDuration.regStart, "dd MMM yyyy")}</p>
                <p>RegEnd: {session.registrationDuration.regEnd && format(session.registrationDuration.regEnd, "dd MMM yyyy")}</p> */}