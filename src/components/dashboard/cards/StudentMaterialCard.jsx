import React from 'react';

const StudentMaterialCard = ({ material }) => {
    return (
        <div className='card card-compact bg-base-100 rounded-md shadow'>
            <div className="card-body">
                <div className='overflow-x-hidden'>
                    <p className='font-semibold text-lg mb-2'>Topic: <span className='underline'>{material?.materialTitle}</span></p>
                    <div>Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a></div>
                    {material?.imageUrl && <>
                        Image: <a className='link link-primary' target='_black' href={material?.imageUrl}>Click</a>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default StudentMaterialCard;