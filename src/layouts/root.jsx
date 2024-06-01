import React from 'react';
import Navbar from '../components/shared/navbar/Navabr';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/footer/Footer';
import Container from '../components/shared/Container';

const Root = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <div>
                <Navbar />
                <Container>
                    <Outlet />
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Root;