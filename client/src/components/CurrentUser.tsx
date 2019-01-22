import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react';
import injectStyles, {StyleSheet, WithStyles} from 'react-jss';
import {createFragmentContainer, graphql, QueryRenderer} from 'react-relay';
import {CurrentUser_self_QueryResponse} from '../__generated__/CurrentUser_self_Query.graphql';
import {CurrentUser_user} from '../__generated__/CurrentUser_user.graphql';
import {ProvidedEnvironmentProps, withEnvironment} from '../graphql/withEnvironment';

interface CurrentUserInfoProps {
    user: CurrentUser_user
}

const currentUserInfoStyles: StyleSheet<CurrentUserInfoProps> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1em'
    },
    footer: {
        marginTop: '0.5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    userFullName: {
        fontSize: '1.2em'
    },
    userEmail: {
        fontSize: '0.8em'
    }
};

const CurrentUserInfo: React.SFC<CurrentUserInfoProps & WithStyles> = (props) => {
    const {user, classes} = props;
    return (
        <div className={classes.container}>
            <FontAwesomeIcon
                icon={faUserCircle}
                style={{
                    width: '6em',
                    height: '6em'
                }}
            />
            <div className={classes.footer}>
                <div className={classes.userFullName}>{user.fullName}</div>
                <div className={classes.userEmail}>{user.email}</div>
            </div>
        </div>
    )
}

const CurrentUserInfoFragment = createFragmentContainer(
    injectStyles(currentUserInfoStyles)(CurrentUserInfo),
    graphql`
        fragment CurrentUser_user on User {
            email
            fullName
        }
    `
);

const CurrentUser: React.SFC<ProvidedEnvironmentProps> = (props) => (
    <QueryRenderer
        environment={props.environment}
        query={graphql`
            query CurrentUser_self_Query {
                self {
                    ...CurrentUser_user
                }
            }
        `}
        variables={{}}
        render={({error, props}: {error: any, props: CurrentUser_self_QueryResponse}) => (
            props && <CurrentUserInfoFragment user={props.self}/>
        )}
    />
);

export default withEnvironment(CurrentUser);
