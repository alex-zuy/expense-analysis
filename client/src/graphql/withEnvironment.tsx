import * as React from 'react';
import {Environment} from 'relay-runtime';
import {Diff} from 'utility-types';
import {setHocDisplayName} from '../components/hoc/setHocDisplayName';
import Context from './environmentContext';

export interface ProvidedEnvironmentProps {
    environment: Environment
}

type HocProps<P extends object> = Diff<P, ProvidedEnvironmentProps>;

export const withEnvironment =
    <P extends ProvidedEnvironmentProps>(
        component: React.ComponentType<P>
    ): React.ComponentType<HocProps<P>> => {

        const Receiver = component;

        const hoc: React.SFC<HocProps<P>> = (props) => (
            <Context.Consumer>
                {(environment) => (
                    <Receiver environment={environment} {...props}/>
                )}
            </Context.Consumer>
        );

        setHocDisplayName(component, hoc, withEnvironment);

        return hoc;
    };
