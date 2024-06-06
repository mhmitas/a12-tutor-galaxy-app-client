import React from 'react';
import EditStudyMaterial from '../shared-dashboard-c/EditStudyMaterial';

const StudyMaterialCard = ({ material, refetch }) => {
    return (
        <div className='card card-compact bg-base-100 rounded-md shadow'>
            <figure><img src={material?.imageUrl} alt="" /></figure>
            <div className="card-body">
                <div className=''>
                    new <br />
                    <h2 className='card-title text-lg mb-2'>Topic: {material?.materialTitle}</h2>
                    <div>Google Drive Link: <a className='link link-primary' target='_black' href={material?.driveLink}>Click</a></div>
                    {/* {material?.imageUrl} */}
                </div>
                <EditStudyMaterial material={material} refetch={refetch} />
            </div>
        </div>
    );
};

export default StudyMaterialCard;