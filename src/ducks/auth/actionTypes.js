const LOGIN = {
    REQUEST: '@@auth/LOGIN_REQUEST',
    SUCCESS: '@@auth/LOGIN_SUCCESS',
    ERROR: '@@auth/LOGIN_ERROR'
};

const REGISTER = {
    REQUEST: '@@auth/REGISTER_REQUEST',
    SUCCESS: '@@auth/REGISTER_SUCCESS',
    ERROR: '@@auth/REGISTER_ERROR'
};

const SET_USER = '@@auth/SET_USER';

const LOGOUT = '@@auth/LOGOUT';

export {
    SET_USER,
    LOGIN,
    LOGOUT,
    REGISTER
};
