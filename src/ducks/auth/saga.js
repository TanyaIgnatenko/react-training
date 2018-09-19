import {loginSuccess, loginError, registerSuccess, registerError} from './actions';
import {call, put, race, take} from 'redux-saga/effects';
import {LOGIN, LOGOUT, REGISTER} from './actionTypes';
import * as API from './services';


function* loginSaga({credentials}) {
    try {
        yield call(API.login, credentials);
        const user = yield call(API.fetchUser);
        yield put(loginSuccess(user));
    } catch (e) {
        yield put(loginError(e));
        throw e;
    }
}

function* registerSaga({credentials}) {
    try {
        yield call(API.register, credentials);
        yield put(registerSuccess());
    } catch (e) {
        yield put(registerError(e.message));
    }
}

export function* watchAuthRequests() {
    while (true) {
        const {login, register} = yield race({
            login: take(LOGIN.REQUEST),
            register: take(REGISTER.REQUEST)
        });

        if (login) {
            try {
                yield call(loginSaga, login);
            } catch (e) {
                continue;
            }

            yield take(LOGOUT);
            yield call(API.logout);
        } else {
            yield call(registerSaga, register);
        }
    }
}
