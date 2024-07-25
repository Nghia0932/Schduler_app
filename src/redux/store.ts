import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import bottomTabReducer from './reducers/bottomTabReducer';

const store = configureStore({
  reducer: {
    authReducer,
    bottomTabReducer,
  },
});
export default store;
