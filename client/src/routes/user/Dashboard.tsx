import * as React from 'react';
import CurrentUser from '../../components/CurrentUser';
import DashboardLayout from '../../components/DashboardLayout';
import {requireLoggedInUser} from '../../components/hoc/requireLoggedInUser';

const Dashboard: React.SFC<{}> = (props) => {
    return (
        <DashboardLayout
            menu={<CurrentUser/>}
            content={'dashboard'}
        />
    )
};

export default requireLoggedInUser(Dashboard);
