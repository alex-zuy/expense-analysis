import {Environment, FetchFunction, Network, RecordSource, Store} from 'relay-runtime';

const fetchQuery: FetchFunction = (operation, variables, cacheConfig, uploadables) =>
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => response.json());

export const createEnvironment = () => {
    const network = Network.create(fetchQuery);
    const store = new Store(new RecordSource());
    return new Environment({
        network,
        store
    });
}
