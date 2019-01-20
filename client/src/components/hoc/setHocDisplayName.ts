import * as React from 'react';

export const setHocDisplayName = (
    wrappedComponent: React.ComponentType,
    hoc: React.ComponentType,
    hocFactory: (...args: any) => React.ComponentType
) => {
    hoc.displayName = `${hocFactory.name}(${getDisplayName(wrappedComponent)})`;
}

const getDisplayName = (component: React.ComponentType) =>
    component.displayName || component.name || 'Component';
