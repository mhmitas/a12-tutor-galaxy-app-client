import React from 'react';
import Hero from './home-components/Hero';
import Sessions from './home-components/sessions';
import TutorsSection from './home-components/TutorsSection';

const Home = () => {

    return (
        <div className='*:mb-16'>
            <Hero />
            <Sessions />
            <TutorsSection />
        </div>
    );
};

export default Home;