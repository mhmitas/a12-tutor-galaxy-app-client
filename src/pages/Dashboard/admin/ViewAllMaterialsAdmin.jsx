import React from 'react';
import Heading from '../../../components/common/Heading';
import useGetQuery from '../../../hooks/useGetQuery';

const ViewAllMaterialsAdmin = () => {
    const [data, isLoading, refetch, error] = useGetQuery('all-study-materials-admin', '/all-materials')
    console.log(data);
    return (
        <div>
            <Heading heading={'All study Materials'} />
        </div>
    );
};

export default ViewAllMaterialsAdmin;