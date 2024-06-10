import React from 'react';
import Hero from './home-components/Hero';
import Sessions from './home-components/sessions';
import TutorsSection from './home-components/TutorsSection';
import FaqHome from './home-components/FaqHome';

const Home = () => {

    return (
        <div className='*:mb-16'>
            <Hero />
            <Sessions />
            <TutorsSection />
            <FaqHome />
        </div>
    );
};

export default Home;