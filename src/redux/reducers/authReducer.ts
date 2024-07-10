import {createSlice} from '@reduxjs/toolkit/';

interface AuthState {
  id: string;
  email: string;
  accesstoken: string;
  name: string;
  photoUrl: string;
}

const initialState: {
  id: string;
  email: string;
  accesstoken: string;
  name: string;
  photoBackGroundUrl: string;
  photo: string;
  familyName: string;
  givenName: string;
} = {
  id: '',
  email: '',
  accesstoken: '',
  name: '',
  photoBackGroundUrl: '',
  photo: '',
  familyName: '',
  givenName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      const {
        id,
        email,
        accesstoken,
        name,
        photoBackGroundUrl,
        photo,
        familyName,
        givenName,
      } = action.payload;
      state.authData = {
        id,
        email,
        accesstoken,
        name,
        photoBackGroundUrl,
        photo,
        familyName,
        givenName,
      };
    },

    removeAuth: (state, action) => {
      state.authData = initialState;
    },
    updatephoto: (state, action) => {
      state.authData.photo = action.payload;
    },
    updatePhotoBackgroundUrl: (state, action) => {
      state.authData.photoBackGroundUrl = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth, updatephoto, updatePhotoBackgroundUrl} =
  authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
