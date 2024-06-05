import React from 'react';
import Hero from './home-components/Hero';
import Sessions from './home-components/sessions';

const Home = () => {

    return (
        <div className='*:mb-16'>
            <Hero />
            <Sessions />
            <div>
                <input onChange={(e) => console.log(e.target.value)} type="date" className='input input-bordered' />
            </div>
        </div>
    );
};

export default Home;