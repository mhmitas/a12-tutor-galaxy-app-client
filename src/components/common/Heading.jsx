import React from 'react';

const Heading = ({ heading, subHeading }) => {
    return (
        <div className='flex flex-col justify-center items-center my-4 mx-auto max-w-xl'>
            {heading &&
                <h2 className='text-2xl lg:text-3xl font-semibold'>{heading}</h2>
            }
            {
                subHeading &&
                <h3 className='text-sm text-center'>{subHeading}</h3>
            }
        </div>
    );
};

export default Heading;