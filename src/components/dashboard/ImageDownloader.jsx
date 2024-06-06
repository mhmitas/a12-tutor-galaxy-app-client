import React from 'react';
import { FaDownload } from "react-icons/fa";

const ImageDownloader = ({ imageUrl, name }) => {
    const downloadImage = async () => {
        try {
            const response = await fetch(imageUrl, {
                mode: 'cors',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = name; // The default file name for the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <button onClick={downloadImage} className='btn btn-primary btn-xs btn-outline'><FaDownload /></button>
    );
};

export default ImageDownloader;