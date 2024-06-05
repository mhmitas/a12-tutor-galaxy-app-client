import React from 'react';
import Heading from '../../../components/common/Heading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import UsersTableRow from '../../../components/table-rows/UsersTableRow';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['manage-all-users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
            // console.log(data);
            return data
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div className='p-4'>
            <Heading heading={'All Users'} />
            <div className="overflow-x-auto bg-base-100 mb-10 ">
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