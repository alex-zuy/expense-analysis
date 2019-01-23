import {faCheckCircle, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from 'react';
import injectSheet, {StyleSheet, WithStyles} from 'react-jss';
import {graphql, QueryRenderer, ReadyState} from 'react-relay';
import {ShopAccountChecker_check_QueryResponse} from '../../../__generated__/ShopAccountChecker_check_Query.graphql';
import {ProvidedEnvironmentProps, withEnvironment} from '../../../graphql/withEnvironment';

interface Props {
    accessToken: string
}

const styles: StyleSheet = {
    container: {

    },
    icon: {

    },
    icon__error: {
        color: 'orange'
    },
    icon__success: {
        color: 'green'
    }
}

const ShopAccountChecker: React.SFC<Props & ProvidedEnvironmentProps & WithStyles> = (props) => {
    const {classes} = props;
    if (props.accessToken) {
        return (
            <QueryRenderer
                environment={props.environment}
                query={graphql`
                    query ShopAccountChecker_check_Query($token: String!) {
                        shopAccountCheck(accessToken: $token) {
                            isSuccess
                            error
                            userName
                        }
                    }
                `}
                variables={{token: props.accessToken}}
                render={(args: ReadyState<ShopAccountChecker_check_QueryResponse>) => {
                    const {error, props} = args;
                    if(props) {
                        const check = props.shopAccountCheck;
                        return (
                            <div className={classes.container}>
                                <FontAwesomeIcon
                                    icon={check.isSuccess ? faCheckCircle : faExclamationTriangle}
                                    className={[
                                        classes.icon,
                                        check.isSuccess ? classes.icon__success : classes.icon__error
                                    ].join(' ')}
                                />
                                {check.isSuccess
                                    ? `Success: ${check.userName}`
                                    : (check.error || 'Unknown error')
                                }
                            </div>
                        );
                    } else {
                        return <></>;
                    }
                }}
            />
        );
    } else {
        return <></>
    }
};

export default withEnvironment(
    injectSheet(styles)(ShopAccountChecker)
);
