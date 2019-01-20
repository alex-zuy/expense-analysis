import * as React from 'react';
import {Environment} from 'relay-runtime';

const EnvironmentContext: React.Context<Environment> = React.createContext(null as any);

export default EnvironmentContext;
