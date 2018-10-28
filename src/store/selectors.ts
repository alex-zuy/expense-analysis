import {RootState} from "./rootState";

export const getTasks = ({tasks}: RootState) => ({
    list: tasks || [],
    isLoaded: tasks !== null
});
