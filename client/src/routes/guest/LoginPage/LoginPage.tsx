import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps} from 'react-router';

import Button from '../../../components/basic/Button';
import {RootState} from '../../../store/rootState';
import * as loginPageState from '../../../store/state/pages/login';

interface LoginPageProps {
    fields: loginPageState.FieldsState,
    loginStatus: loginPageState.StatusState,
    onEmailChange: (s: string) => void,
    onPasswordChange: (s: string) => void,
    onAttemptLogin: () => void
}

const style: StyleSheet<LoginPageProps> = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '26rem',
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gridGap: '1em',
    },
    submitButton: {
        gridColumn: '2 / 3',
        display: 'flex',
        flexDirection: 'column'
    },
    legend: {
        gridColumn: 'span 2',
    }
};

const LoginPage: React.SFC<RouteComponentProps & LoginPageProps & WithStyles> = (props) => {

    const {
        classes,
        fields
    } = props;

    return (
        <div className={classes.container}>
            <div className={`pure-form ${classes.form}`}>
                {props.loginStatus.finished && (
                    <Redirect to="/"/>
                )}
                <legend className={classes.legend}>
                    Login to application
                </legend>
                <label>
                    Email
                </label>
                <input
                    type="text"
                    value={fields.email}
                    onChange={(e) => props.onEmailChange(e.target.value)}
                />
                <label>
                    Password
                </label>
                <input
                    type="password"
                    value={fields.password}
                    onChange={(e) => props.onPasswordChange(e.target.value)}
                />
                <div className={classes.submitButton}>
                    <Button onClick={() => props.onAttemptLogin()}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
};

const LoginPageStyled = injectSheet(style)(LoginPage);

const mapState = (state: RootState) => {
    const slice = state.pages.login;

    return {
        fields: loginPageState.selectors.getFields(slice),
        loginStatus: loginPageState.selectors.getLoginStatus(slice)
    }
}

const mapDispatch = {
    onEmailChange: loginPageState.actions.changeEmail,
    onPasswordChange: loginPageState.actions.changePassword,
    onAttemptLogin: loginPageState.actions.attemptLogin
};

export default connect(mapState, mapDispatch)(LoginPageStyled);
