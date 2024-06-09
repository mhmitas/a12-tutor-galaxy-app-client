import React from 'react';
import queryString, { } from "query-string";
import { useNavigate, useSearchParams } from 'react-router-dom';

const TutorAllSessionsTab = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    function handleClick(params) {
        const query = queryString.stringifyUrl({
            url: '/dashboard/tutor/all-study-sessions',
            query: { status: params }
        })
        navigate(query)
    }
    const currentTab = searchParams.get('status');

    return (
        <div role="tablist" className="tabs tabs-bordered font-semibold">
            <button onClick={() => handleClick('approved')} role="tab" className={`tab ${currentTab === 'approved' ? 'tab-active text-primary' : ''}`}>Approved</button>
            <button onClick={() => handleClick('pending')} role="tab" className={`tab ${currentTab === 'pending' ? 'tab-active text-primary' : ''}`}>Pending</button>
            <button onClick={() => handleClick('rejected')} role="tab" className={`tab ${currentTab === 'rejected' ? 'tab-active text-primary' : ''}`}>Rejected</button>
        </div>
    );
};

export default TutorAllSessionsTab;