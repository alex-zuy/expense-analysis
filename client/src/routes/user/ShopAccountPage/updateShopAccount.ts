import {commitMutation, graphql} from 'react-relay';
import {Environment} from 'relay-runtime';
import {ShopAccountUpdateInput} from '../../../__generated__/updateShopAccount_Mutation.graphql';

const updateShopAccount = async (environment: Environment, input: ShopAccountUpdateInput) => {
    return new Promise((resolve, reject) => {
        commitMutation(
            environment,
            {
                mutation: graphql`
                    mutation updateShopAccount_Mutation($input: ShopAccountUpdateInput!) {
                        updateShopAccount(input: $input) {
                            id
                            updatedAt
                        }
                    }
                `,
                variables: {input},
                onCompleted: (response, errors) => {
                    if(errors) {
                        reject(errors);
                    } else {
                        resolve(response);
                    }
                }
            }
        )
    });
};

export default updateShopAccount;
