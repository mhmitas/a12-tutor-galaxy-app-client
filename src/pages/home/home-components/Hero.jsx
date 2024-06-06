import React, { useState } from 'react';
import useRole from '../../../hooks/useRole';

const Hero = () => {
    const [role, isLoading] = useRole()
    // const [showUpdateModal, setShowUpdateModal] = useState(false)
    return (
        <div>
            <div className="h-[600px] mt-2 bg-center" style={{ backgroundImage: 'url(https://i.ibb.co/XS6ZN8H/90.jpg)' }}>
                <div className="flex text-center justify-center items-center h-full bg-black w-full bg-opacity-25 text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">TutorGalaxy</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;