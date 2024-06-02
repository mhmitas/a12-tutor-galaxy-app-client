import React from 'react';

const SessionDetail = () => {
    return (
        <div>
            <section className="bg-base-100 my-10">
                <div className="container mx-auto p-6 shadow-md rounded-lg">
                    <div className="flex flex-col md:flex-row">
                        <img src="thumbnail.jpg" alt="Session Thumbnail" className="w-full md:w-1/3 rounded-lg" />
                        <div className="md:ml-6 mt-4 md:mt-0">
                            <h1 className="text-2xl font-bold mb-2">Session Title</h1>
                            <p className="mb-2"><strong>Tutor:</strong> Tutor Name</p>
                            <div className="flex items-center mb-2">
                                <div className="rating">
                                    <input type="radio" name="rating" className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating" className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating" className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating" className="mask mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating" className="mask mask-star-2 bg-gray-400" />
                                </div>
                                <span className="ml-2 ">4.0</span>
                            </div>
                            <p className="mb-4">Session Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac orci a ex posuere malesuada.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p><strong>Registration Start Date:</strong> 2024-06-01</p>
                                <p><strong>Registration End Date:</strong> 2024-06-10</p>
                                <p><strong>Class Start Time:</strong> 10:00 AM</p>
                                <p><strong>Class End Date:</strong> 2024-07-01</p>
                                <p><strong>Session Duration:</strong> 1 Hour</p>
                                <p><strong>Registration Fee:</strong> $50</p>
                            </div>
                            <button className="btn btn-primary mt-4">Book Now</button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg shadow">
                                <p className="font-semibold">Student Name 1</p>
                                <p className="">Review text from student 1...</p>
                            </div>
                            <div className="p-4 rounded-lg shadow">
                                <p className="font-semibold">Student Name 2</p>
                                <p className="">Review text from student 2...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SessionDetail;