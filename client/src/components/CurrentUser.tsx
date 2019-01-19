import * as React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import {Environment} from 'relay-runtime';
import {CurrentUser_self_QueryResponse} from '../__generated__/CurrentUser_self_Query.graphql';
import {ProvidedEnvironmentProps, withEnvironment} from '../graphql/withEnvironment';

const CurrentUser: React.SFC<ProvidedEnvironmentProps> = (props) => (
    <QueryRenderer
        environment={props.environment}
        query={graphql`
            query CurrentUser_self_Query {
                self {
                    id
                    email
                }
            }
        `}
        variables={{}}
        render={({error, props}: {error: any, props: CurrentUser_self_QueryResponse}) => (
            <div>
                Error: {error}
                Data: {props && props.self.email}
            </div>
        )}
    />
);

export default withEnvironment(CurrentUser);
