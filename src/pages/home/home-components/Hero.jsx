import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [role, isLoading] = useRole()
    // const [showUpdateModal, setShowUpdateModal] = useState(false)
    return (
        <div>
            <div className="h-[600px] mt-2 bg-center bg-cover rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/Bz51vNw/pexels-pixabay.jpg)' }}>
                <div className="flex text-center justify-center items-center h-full text-white">
                    <div className="max-w-3xl rounded-lg bg-black w-full bg-opacity-40 px-12 py-8 mx-10">
                        <h1 className="mb-5 text-5xl font-bold">TutorGalaxy</h1>
                        <p className="mb-5 font-semibold">Unlock Your Potential with Tutor Galaxy - Your Destination for Personalized Learning and Expert Tutors. Discover a Galaxy of Knowledge, Explore a Wide Range of Courses, and Empower Your Future Today.
                        </p>
                        <Link to="/all-sessions"><button className="btn btn-primary">Let's Explore</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;