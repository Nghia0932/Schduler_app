import {createSlice} from '@reduxjs/toolkit/';

interface AuthState {
  id: string;
  email: string;
  accesstoken: string;
  fullname: string;
  photoUrl: string;
}

const initialState: {
  id: string;
  email: string;
  accesstoken: string;
  fullname: string;
  photoBackGroundUrl: string;
  photoAvatarUrl: string;
} = {
  id: '',
  email: '',
  accesstoken: '',
  fullname: '',
  photoBackGroundUrl: '',
  photoAvatarUrl: '',
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
        fullname,
        photoBackGroundUrl,
        photoAvatarUrl,
      } = action.payload;
      state.authData = {
        id,
        email,
        accesstoken,
        fullname,
        photoBackGroundUrl,
        photoAvatarUrl,
      };
    },

    removeAuth: (state, action) => {
      state.authData = initialState;
    },
    updatePhotoAvatarUrl: (state, action) => {
      state.authData.photoAvatarUrl = action.payload;
    },
    updatePhotoBackgroundUrl: (state, action) => {
      state.authData.photoBackGroundUrl = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  addAuth,
  removeAuth,
  updatePhotoAvatarUrl,
  updatePhotoBackgroundUrl,
} = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
