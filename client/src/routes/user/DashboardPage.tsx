import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import CurrentUser from '../../components/CurrentUser';
import DashboardLayout from '../../components/DashboardLayout';
import {requireLoggedInUser} from '../../components/hoc/requireLoggedInUser';
import MenuLink from '../../components/MenuLink';
import ExpensesClassificationPage from './ExpensesClassificationPage/ExpensesClassificationPage';
import PurchaseHistoryPage from './PurchaseHistoryPage/PurchaseHistoryPage';
import ShopAccountPage from './ShopAccountPage/ShopAccountPage';

const DashboardPage: React.SFC<RouteComponentProps> = (props) => {
    return (
        <DashboardLayout
            menu={
                <>
                    <CurrentUser/>
                    <MenuLink to="/shopAccount">
                        Shop account
                    </MenuLink>
                    <MenuLink to="/purchasesHistory">
                        Purchases history
                    </MenuLink>
                    <MenuLink to="/expensesClassification">
                        Expenses classification
                    </MenuLink>
                </>
            }
            content={(
                <>
                    <Route path="/" exact render={() => 'root content'}/>
                    <Route path="/shopAccount" component={ShopAccountPage}/>
                    <Route path="/purchasesHistory" component={PurchaseHistoryPage}/>
                    <Route path="/expensesClassification" component={ExpensesClassificationPage}/>
                </>
            )}
        />
    )
};

export default requireLoggedInUser(DashboardPage);
