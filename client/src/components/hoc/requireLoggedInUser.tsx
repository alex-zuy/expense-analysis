import * as React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {RootState} from '../../store/rootState';
import * as isLoggedInState from '../../store/state/isLoggedIn';
import {setHocDisplayName} from './setHocDisplayName';

const mapState = (state: RootState) => {
    return isLoggedInState.selectors.getStatus(state.isLoggedIn);
}

export const requireLoggedInUser = <T extends {}>(
    component: React.ComponentType<T>
): React.ComponentType<T> => {

    const hoc: React.SFC<{isLoaded: boolean, isLoggedIn: boolean}> = (props) => {
        if(props.isLoaded) {
            if (props.isLoggedIn) {
                // rest from generic type is not supported in TS
                const {isLoaded, isLoggedIn, ...rest} = props as any;

                const Target = component;

                return <Target {...rest}/>;
            } else {
                return <Redirect to={{pathname: '/login'}}/>;
            }
        } else {
            return null;
        }
    }

    setHocDisplayName(component, hoc, requireLoggedInUser);

    return connect(mapState)(hoc) as any;
};
