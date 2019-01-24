type ChangeCallback<T> = (next: T, prev: T) => void;

type PropertyChecker<P> = <K extends keyof P>(propName: K, callback: ChangeCallback<P[K]>) => void;

export const propsCompare = <P extends object>(nextProps: P, prevProps: P): PropertyChecker<P> => {
    return (propName, callback) => {
        const next = nextProps[propName];
        const prev = prevProps[propName];
        if(next !== prev) {
            callback(next, prev);
        }
    }
};
