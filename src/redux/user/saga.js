import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchUserByIdFailure, fetchUserByIdSuccess, fetchUsersFailure, fetchUsersSuccess } from './slice';
//API USERS: https://jsonplaceholder.typicode.com/users

function* fetchUsers() {
    try {
        yield delay(2000);

        const response = yield call(axios.get, "https://jsonplaceholder.typicode.com/users");
        yield put(fetchUsersSuccess(response.data));
    }
    catch(error) {
        yield put(fetchUsersFailure(error.message));
        console.log("Erro na API.", error);
    }
}

function* fetchUserById(action) {
    try {
         yield delay(2000);
         
        const userId = action.payload;
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`);
        yield put(fetchUserByIdSuccess(response.data));
    }
    catch(error) {
        yield put(fetchUserByIdFailure(error.message));
    }
}

export default all([
    takeLatest("user/fetchUsers", fetchUsers),
    takeLatest("user/fetchUserById", fetchUserById),
])