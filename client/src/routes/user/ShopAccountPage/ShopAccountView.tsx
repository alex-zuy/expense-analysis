import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {createFragmentContainer, graphql} from 'react-relay';
import {ShopAccountView_account} from '../../../__generated__/ShopAccountView_account.graphql';
import Button from '../../../components/basic/Button';
import ShopAccountChecker from './ShopAccountChecker';

interface AccountFields extends Pick<ShopAccountView_account, 'login' | 'accessToken' | 'expiresAt'> { }

interface ShopAccountViewProps {
    account: ShopAccountView_account | null,
    onSave(fields: AccountFields & {id: string | null}): void
}

const shopAccountStyles: StyleSheet<ShopAccountViewProps> = {
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

interface ShopAccountViewState extends AccountFields { }

class ShopAccountView extends React.Component<ShopAccountViewProps & WithStyles, ShopAccountViewState> {

    constructor(props: ShopAccountViewProps & WithStyles) {
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
        const {account} = this.props;
        this.props.onSave({...this.state, id: account ? account.id : null});
    }

    render() {
        const {props, state} = this;
        const {classes} = props;
        return (
            <>
                <h3>Shop accounts</h3>
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
    injectSheet(shopAccountStyles)(ShopAccountView),
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
