import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {commitMutation, createFragmentContainer, graphql} from 'react-relay';
import {Environment} from 'relay-runtime';
import {ShopAccountView_account} from '../../../__generated__/ShopAccountView_account.graphql';
import Button from '../../../components/basic/Button';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';
import ShopAccountChecker from './ShopAccountChecker';
import {ShopAccountUpdateInput} from 'src/__generated__/ShopAccountView_accountUpdate_Mutation.graphql';

interface ViewProps extends ProvidedEnvironmentProps {
    account: ShopAccountView_account | null
}

const shopAccountStyles: StyleSheet<ViewProps> = {
    form: {
        marginTop: '1em',
        display: 'grid',
        gridTemplateColumns: 'max-content minmax(20em, 25em)',
        gridGap: '.6em'
    },
    submitButtonWrapper: {
        gridColumn: '2 / 3',
    }
};

interface ViewState extends ShopAccountUpdateInput { }

class ShopAccountView extends React.Component<ViewProps & WithStyles, ViewState> {

    constructor(props: ViewProps & WithStyles) {
        super(props);
        const {account} = props;
        if(account) {
            this.state = {
                login: account.login,
                accessToken: account.accessToken,
                expiresAt: account.expiresAt,
            };
        } else {
            this.state = {
                login: '',
                accessToken: '',
                expiresAt: '',
            };
        }
    }

    _handleLoginChange = (login: string) =>
        this.setState({login});

    _handleTokenChange = (accessToken: string) =>
        this.setState({accessToken});

    _handleExpiresChange = (expiresAt: string) =>
        this.setState({expiresAt});

    _handleSave = () => {
        updateShopAccount(this.props.environment, this.state);
    }

    render() {
        const {props, state} = this;
        const {classes} = props;
        return (
            <>
                <h1>Shop accounts</h1>
                <div>
                    You need to provide shop account in order for
                    system to fetch your shopping history
                </div>
                Last updated at: {props.account && props.account.updatedAt}
                <div className={`pure-form ${classes.form}`}>
                    <label>
                        Login
                    </label>
                    <input
                        type="text"
                        value={state.login}
                        onChange={(e) => this._handleLoginChange(e.target.value)}
                    />
                    <label>
                        Access token
                    </label>
                    <input
                        type="text"
                        value={state.accessToken}
                        onChange={(e) => this._handleTokenChange(e.target.value)}
                    />
                    <label>
                        Expires at
                    </label>
                    <input
                        type="text"
                        value={state.expiresAt}
                        onChange={(e) => this._handleExpiresChange(e.target.value)}
                    />
                    <div className={classes.submitButtonWrapper}>
                        <Button onClick={this._handleSave}>
                            Save
                        </Button>
                        <ShopAccountChecker accessToken={this.state.accessToken}/>
                    </div>
                </div>
            </>
        )
    }
}

export default createFragmentContainer(
    withEnvironment(injectSheet(shopAccountStyles)(ShopAccountView)),
    graphql`
        fragment ShopAccountView_account on ShopAccount {
            id
            login
            accessToken
            expiresAt
            updatedAt
        }
    `
);

const updateShopAccount = async (environment: Environment, input: ShopAccountUpdateInput) => {
    return new Promise((resolve, reject) => {
        commitMutation(
            environment,
            {
                mutation: graphql`
                    mutation ShopAccountView_accountUpdate_Mutation($input: ShopAccountUpdateInput!) {
                        updateShopAccount(input: $input) {
                            ...ShopAccountView_account
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
