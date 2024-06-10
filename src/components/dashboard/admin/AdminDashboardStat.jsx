import React from 'react';

const AdminDashboardStat = () => {
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full rounded-md mb-10">

            <div className="stat text-center">
                <div className="stat-title">Total Active Sessions</div>
                <div className="stat-value">31K</div>
            </div>

            <div className="stat text-center">
                <div className="stat-title">Total Tutors</div>
                <div className="stat-value">4,200</div>
            </div>

            <div className="stat text-center">
                <div className="stat-title">Total Students</div>
                <div className="stat-value">1,200</div>
            </div>

        </div>
    );
};

export default AdminDashboardStat;