import React, { useEffect, useState } from 'react';
import Heading from '../../../components/common/Heading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import UsersTableRow from '../../../components/table-rows/UsersTableRow';
import { FaSearch } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    console.log(searchText);
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-all-users', searchText],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/admin/users?searchText=${searchText}`)
            // console.log(data);
            return data
        }
    })

    async function handleSearch(e) {
        e.preventDefault()
        setSearchText(e.target.search.value)
        // console.log(e.target.search.value);
        refetch()
    }

    return (
        <div className='p-4'>
            <Heading heading={'All Users'} />
            <form onSubmit={handleSearch} className="max-w-lg mx-auto my-6">
                <label className="input input-bordered flex items-center gap-2">
                    <input onChange={e => e.target.value.length === 0 && setSearchText('')} type="text" name='search' className="grow" placeholder="Search user..." />
                    <button type='submit' className='btn btn-info btn-sm px-4'><FaSearch /></button>
                </label>
            </form>
            <div className="overflow-x-auto bg-base-100 mb-10 ">
                {isLoading && <span>Loading...</span>}
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-base-300'>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => <UsersTableRow
                            user={user}
                            key={user._id}
                            idx={idx}
                            refetch={refetch}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;