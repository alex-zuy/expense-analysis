import * as React from 'react';
import {createFragmentContainer, graphql, QueryRenderer, ReadyState} from 'react-relay';
import {PurchaseHistoryPage_account} from 'src/__generated__/PurchaseHistoryPage_account.graphql';
import {PurchaseHistoryPage_importedRange_QueryResponse} from '../../../__generated__/PurchaseHistoryPage_importedRange_Query.graphql';
import {deserializeDate} from '../../../graphql/dateTime';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import HistoryImport from './HistoryImport';
import HistoryListing from './HistoryListing';

const PurchaseHistoryPage: React.SFC<ProvidedEnvironmentProps> = (props) => {

    const {environment} = props;
    return (
        <>
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query PurchaseHistoryPage_importedRange_Query {
                        self {
                            shopAccount {
                                ...PurchaseHistoryPage_account
                            }
                        }
                    }
                `}
                variables={{}}
                render={(args: ReadyState<PurchaseHistoryPage_importedRange_QueryResponse>) => {
                    const {props} = args;
                    return (
                        <ViewFragment
                            isLoaded={Boolean(props)}
                            account={props && props.self.shopAccount || null}
                        />
                    );
                }}
            />
        </>
    );
}

export default withEnvironment(PurchaseHistoryPage);

interface ViewProps {
    isLoaded: boolean,
    account: PurchaseHistoryPage_account | null
}

const View: React.SFC<ViewProps> = (props) => {
    const {account} = props;

    const dateRange = (account && account.importedRangeStart && account.importedRangeEnd)
        ? {
            dateFrom: deserializeDate(account.importedRangeStart),
            dateTo: deserializeDate(account.importedRangeEnd)
        }
        : null;

    return (
        <>
            <h1>Purchase History</h1>
            <HistoryImport
                isLoaded={props.isLoaded}
                importedRange={dateRange}
            />
            <HistoryListing
                availableRange={dateRange}
                isLoaded={props.isLoaded}
            />
        </>
    );
}

const ViewFragment = createFragmentContainer(
    View,
    graphql`
        fragment PurchaseHistoryPage_account on ShopAccount {
            importedRangeStart
            importedRangeEnd
        }
    `
);
