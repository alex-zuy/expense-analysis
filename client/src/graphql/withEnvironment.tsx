import * as React from 'react';
import {Environment} from 'relay-runtime';
import {Omit} from 'utility-types';
import {setHocDisplayName} from '../components/hoc/setHocDisplayName';
import Context from './environmentContext';

export interface ProvidedEnvironmentProps {
    environment: Environment
}

export const withEnvironment =
    <P extends ProvidedEnvironmentProps>(
        component: React.ComponentType<P>
    ): React.ComponentType<Omit<P, keyof ProvidedEnvironmentProps>> => {

        const Receiver = component;

        const hoc = () => (
            <Context.Consumer>
                {(environment) => (
                    <Receiver environment={environment}/>
                )}
            </Context.Consumer>
        );

        setHocDisplayName(component, hoc, withEnvironment);

        return hoc;
    };
