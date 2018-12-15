import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {connect} from 'react-redux';
import {RootState} from '../../../store/rootState';
import * as loginPageState from '../../../store/state/pages/login';

import Button from '../../../components/basic/Button';

interface DataProps {
    fields: {
        email: string,
        password: string
    }
}

interface CallbackProps {
    onEmailChange: (s: string) => void,
    onPasswordChange: (s: string) => void,
}

const style: StyleSheet<DataProps> = {
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

const LoginPage = (props: DataProps & WithStyles & CallbackProps) => {

    const {
        classes,
        fields
    } = props;

    return (
        <div className={classes.container}>
            <div className={`pure-form ${classes.form}`}>
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
                    <Button>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
};

const LoginPageStyled = injectSheet(style)(LoginPage);

const mapState = (state: RootState): DataProps => {
    const slice = state.pages.login;

    return {
        fields: loginPageState.selectors.getFields(slice),
    }
}

const mapDispatch: CallbackProps = {
    onEmailChange: loginPageState.actions.changeEmail,
    onPasswordChange: loginPageState.actions.changePassword
};

export default connect(mapState, mapDispatch)(LoginPageStyled);
