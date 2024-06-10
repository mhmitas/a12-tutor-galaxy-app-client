import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [role, isLoading] = useRole()
    // const [showUpdateModal, setShowUpdateModal] = useState(false)
    return (
        <div>
            <div className="h-[600px] mt-2 bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/XS6ZN8H/90.jpg)' }}>
                <div className="flex text-center justify-center items-center h-full bg-black w-full bg-opacity-25 text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">TutorGalaxy</h1>
                        <p className="mb-5">Unlock Your Potential with Tutor Galaxy - Your Destination for Personalized Learning and Expert Tutors. Discover a Galaxy of Knowledge, Explore a Wide Range of Courses, and Empower Your Future Today.
                        </p>
                        <Link to="/all-sessions"><button className="btn btn-primary">Let's Explore</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;