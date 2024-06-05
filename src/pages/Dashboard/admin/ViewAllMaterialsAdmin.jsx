import React from 'react';
import Heading from '../../../components/common/Heading';
import useGetQuery from '../../../hooks/useGetQuery';
import ViewAllMaterialsAdminRow from '../../../components/table-rows/ViewAllMaterialsAdminRow';

const ViewAllMaterialsAdmin = () => {
    const [data, isLoading, refetch, error] = useGetQuery('all-study-materials-admin', '/all-materials')
    console.log(data);

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <div>
            <Heading heading={'All study Materials'} />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Session name</th>
                            <th>Material name</th>
                            <th>Tutor</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((material, idx) => <ViewAllMaterialsAdminRow material={material} key={material?._id} idx={idx} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllMaterialsAdmin;