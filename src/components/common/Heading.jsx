import React from 'react';

const Heading = ({ heading, subHeading }) => {
    return (
        <div className='flex flex-col justify-center items-center my-4 mx-auto max-w-xl'>
            {heading &&
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>{heading}</h2>
            }
            {
                subHeading &&
                <h3 className='text-sm text-center'>{subHeading}</h3>
            }
        </div>
    );
};

export default Heading;