import * as React from 'react';
import {graphql, QueryRenderer, ReadyState} from 'react-relay';
import {ShopAccountPage_account_QueryResponse} from 'src/__generated__/ShopAccountPage_account_Query.graphql';
import {$PropertyType} from 'utility-types';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import ShopAccountView from './ShopAccountView';
import updateShopAccountMutation from './updateShopAccount';

const ShopAccountPage: React.SFC<{} & ProvidedEnvironmentProps> = (props) => {
    const {environment} = props;
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query ShopAccountPage_account_Query {
                    self {
                        shopAccount {
                            ...ShopAccountView_account
                        }
                    }
                }
            `}
            variables={{}}
            render={(args: ReadyState<ShopAccountPage_account_QueryResponse>) => {
                const {error, props} = args;
                if(props) {
                    return (
                        <ShopAccountView
                            account={props.self.shopAccount}
                            onSave={(fields) => updateShopAccountMutation(environment, fields)}
                        />
                    );
                } else {
                    return null;
                }
            }}
        />
    );
};

export default withEnvironment(ShopAccountPage);
