import React from 'react';
import ImageDownloader from '../ImageDownloader';

const StudentMaterialCard = ({ material }) => {
    return (
        <div className='card card-compact bg-base-100 rounded-md shadow'>
            <div className='relative'><img src={material?.imageUrl} alt="" /><div title='Click to download image' className='absolute bottom-0 right-4'><ImageDownloader imageUrl={material?.imageUrl} name={material?.materialTitle} /></div></div>
            <div className="card-body">
                <div className=''>
                    <h2 className='card-title text-lg mb-2'>Topic: {material?.materialTitle}</h2>
                    <div>Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a></div>
                    {/* {material?.imageUrl} */}
                </div>
                <div className="card-actions">
                </div>
            </div>

        </div>
    );
};

export default StudentMaterialCard;