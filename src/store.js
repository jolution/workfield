import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import SecureLS from "secure-ls";

const ls = new SecureLS({isCompression: false});

const store = createStore({
    state() {
        return {
            globalError: "",
            //count: 0,
            rights: undefined,
            username: undefined,
            user_id: undefined,
        };
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => Cookies.get(key),
                setItem: (key, value) =>
                    Cookies.set(key, value, {expires: 3, secure: true}),
                removeItem: (key) => Cookies.remove(key),
            },
        }),
    ],
    mutations: {
        myUserName: (state, value) =>
            value ? (state.username = value) : (state.username = undefined),
        myUserId: (state, value) =>
            value ? (state.user_id = value) : (state.user_id = undefined),
        myUserRights: (state, value) =>
            value ? (state.rights = value) : (state.rights = undefined),
        setGlobalError(state, error) {
            state.globalError = error;
        },
    },
});

export default store;
