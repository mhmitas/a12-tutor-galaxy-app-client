import React, { useState } from 'react';
import SessionsCard from '../home/home-components/SessionsCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowAltCircleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AllSessions = () => {
    const axiosSecure = useAxiosSecure()
    const [sessionsPerPage, setSessionsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(0)
    const { data: totalSessions = 0, isLoading: counting } = useQuery({
        queryKey: ['total-session-count'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/total-sessions`)
            // console.log(data.totalSessions)
            return data.totalSessions
        }
    })

    const { data: sessions = [], isLoading, error } = useQuery({
        queryKey: ['all-sessions', currentPage, sessionsPerPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-study-sessions?status=approved&limit=${sessionsPerPage}&page=${currentPage}`)
            return data
        }
    })

    // define total number of pages
    const totalPages = Math.ceil(totalSessions / sessionsPerPage)
    // create pages
    const pages = [...Array(totalPages).keys()]
    // console.log(pages);


    if (isLoading || counting) {
        return <span className='absolute top-1/2 left-1/2'>Loading...</span>
    }
    if (error) {
        return <span>{error.message}</span>
    }

    return (
        <div>
            <div className="bg-base-100 p-8 rounded-lg shadow-lg my-6">
                <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                    <h1 className="text-3xl font-semibold mb-4 lg:mb-0">All Sessions</h1>
                    {/* <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                        <div className="relative w-full lg:w-64 mb-4 lg:mb-0 lg:mr-4">
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" readOnly className="grow " placeholder="Search..." />
                                <FaSearch />
                            </label>
                        </div>
                        <select disabled className="select select-bordered ml-auto lg:w-auto">
                            <option hidden >Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                            <option>Popularity</option>
                        </select>
                    </div> */}
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4 mt-12'>
                {sessions.map(session => <SessionsCard session={session} key={session._id} />)}
            </div>

            {/* pagination buttons */}
            <div className='flex my-10 gap-1 items-center justify-center overflow-x-auto'>
                {/* next previous buttons */}
                <button
                    onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                    className='btn btn-success'>Previous</button>
                <button
                    onClick={() => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1)}
                    className='btn btn-success'>Next</button>
                {/* page buttons */}
                {pages.map(page => <button
                    onClick={() => setCurrentPage(page)}
                    key={page}
                    className={`btn ${currentPage === page ? 'btn-warning' : 'btn-neutral'} `}
                >{page + 1}</button>)}
                <select value={sessionsPerPage} onChange={(e) => { setSessionsPerPage(e.target.value); setCurrentPage(0) }} className='select select-bordered ml-2'>
                    <option value={8}>Sessions Per Page 8</option>
                    <option value={15}>Sessions Per Page 15</option>
                    <option value={20}>Sessions Per Page 20</option>
                </select>
            </div>
        </div>
    );
};

export default AllSessions;