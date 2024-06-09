import React from 'react';
import Heading from '../../../components/common/Heading';
import useGetQuery from '../../../hooks/useGetQuery';
import ViewAllMaterialsAdminRow from '../../../components/table-rows/ViewAllMaterialsAdminRow';

const ViewAllMaterialsAdmin = () => {
    const [data, isLoading, refetch, error] = useGetQuery('all-study-materials-admin', '/all-materials-admin')
    // console.log(data);

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'All study Materials'} />
            <div className="overflow-x-auto bg-base-100 my-8">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-base-300'>
                        <tr>
                            <th>#</th>
                            <th>Session name</th>
                            <th>Material name</th>
                            <th>Tutor</th>
                            <th>View materials</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((material, idx) => <ViewAllMaterialsAdminRow material={material} key={material?._id} idx={idx} refetch={refetch} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllMaterialsAdmin;