import React from 'react';
import { FaSearch } from "react-icons/fa";
import Container from '../../components/shared/Container';

const AllSessions = () => {
    return (
        <Container>
            <div className="bg-base-100 p-6 rounded-lg shadow-lg my-6">
                <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                    <h1 className="text-3xl font-semibold mb-4 lg:mb-0">All Sessions</h1>
                    <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                        <div className="relative w-full lg:w-64 mb-4 lg:mb-0 lg:mr-4">
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow" placeholder="Search..." />
                                <FaSearch />
                            </label>
                        </div>
                        <select className="select select-bordered ml-auto lg:w-auto">
                            <option disabled selected>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                            <option>Popularity</option>
                        </select>
                    </div>
                </div>
            </div>

        </Container>
    );
};

export default AllSessions;