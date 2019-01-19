import * as React from 'react';
import {Environment} from 'relay-runtime';

const GraphQlEnvironment: React.Context<Environment> = React.createContext(null as any);

export default GraphQlEnvironment;
