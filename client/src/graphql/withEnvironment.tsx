import * as React from 'react';
import {Environment} from 'relay-runtime';
import {Omit} from 'utility-types';
import GraphQlContext from '../context/graphql';

export interface ProvidedEnvironmentProps {
    environment: Environment
}

export const withEnvironment =
    <P extends ProvidedEnvironmentProps>(
        component: React.ComponentType<P>
    ): React.ComponentType<Omit<P, keyof ProvidedEnvironmentProps>> => {

        const Receiver = component;

        const hoc = () => (
            <GraphQlContext.Consumer>
                {(environment) => (
                    <Receiver environment={environment}/>
                )}
            </GraphQlContext.Consumer>
        );

        hoc.displayName = `${withEnvironment.name}(${getDisplayName(component)})`;

        return hoc;
    };

const getDisplayName = (component: React.ComponentType) =>
    component.displayName || component.name || 'Component';
