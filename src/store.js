import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './helper/Slices/authSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistConfig = {
    key:'root',
    version :1,
    storage
}

const reducers = combineReducers({
    authentication : AuthReducer,
});

const persistedReducer = persistReducer(persistConfig,reducers);

const Store = configureStore(
    {
        reducer : persistedReducer,
    }
)

export default Store;