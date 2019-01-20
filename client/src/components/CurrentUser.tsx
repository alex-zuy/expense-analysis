import * as React from 'react';
import injectStyles, {WithStyles, StyleSheet} from 'react-jss';
import {graphql, QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';
import {$PropertyType} from 'utility-types';
import {CurrentUser_self_QueryResponse} from '../__generated__/CurrentUser_self_Query.graphql';
import {ProvidedEnvironmentProps, withEnvironment} from '../graphql/withEnvironment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

interface CurrentUserInfoProps {
    user: $PropertyType<CurrentUser_self_QueryResponse, 'self'>,
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
    },
    avatarWrapper: {
        paddingBottom: '100%',
        width: '100%',
        position: 'relative',
    },
    avatarIcon: {
        position: 'absolute',
    }
};

const CurrentUserInfo: React.SFC<CurrentUserInfoProps & WithStyles> = (props) => {
    const {user, classes} = props;
    return (
        <div className={classes.container}>
            <div className={classes.avatarWrapper}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className={classes.avatarIcon}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
            <div className={classes.footer}>
                <div className={classes.userFullName}>{user.fullName}</div>
                <div className={classes.userEmail}>{user.email}</div>
            </div>
        </div>
    )
}

const CurrentUserInfoStyled = injectStyles(currentUserInfoStyles)(CurrentUserInfo);

const CurrentUser: React.SFC<ProvidedEnvironmentProps> = (props) => (
    <QueryRenderer
        environment={props.environment}
        query={graphql`
            query CurrentUser_self_Query {
                self {
                    id
                    email
                    fullName
                }
            }
        `}
        variables={{}}
        render={({error, props}: {error: any, props: CurrentUser_self_QueryResponse}) => (
            props && <CurrentUserInfoStyled user={props.self}/>
        )}
    />
);

export default withEnvironment(CurrentUser);
