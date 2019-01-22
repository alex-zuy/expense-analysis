import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import Link from '../../components/basic/Link';
import CurrentUser from '../../components/CurrentUser';
import DashboardLayout from '../../components/DashboardLayout';
import {requireLoggedInUser} from '../../components/hoc/requireLoggedInUser';
import ShopAccountPage from './ShopAccountPage/ShopAccountPage';

const DashboardPage: React.SFC<RouteComponentProps> = (props) => {
    return (
        <DashboardLayout
            menu={
                <>
                    <CurrentUser/>
                    <Link to="/shopAccount">
                        Shop account
                    </Link>
                </>
            }
            content={(
                <>
                    <Route path="/" exact render={() => 'root content'}/>
                    <Route path={`/shopAccount`} component={ShopAccountPage}/>
                </>
            )}
        />
    )
};

export default requireLoggedInUser(DashboardPage);
