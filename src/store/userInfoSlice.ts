import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserInfo {
    first_name: string | null;
    last_name: string | null;
    role: 'admin' | 'teacher' | 'student' | null;
    accessToken: string | null;
}
const initialState: UserInfo = {
    first_name: null,
    last_name: null,
    role: null,
    accessToken: null,
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },

        setFirstName: (state, action: PayloadAction<string | null>) => {
            state.first_name = action.payload;
        },

        setLastName: (state, action: PayloadAction<string | null>) => {
            state.last_name = action.payload;
        },

        setRole: (state, action: PayloadAction<'admin' | 'teacher' | 'student' | null>) => {
            state.role = action.payload;
        },

        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },

        resetUserInfo: () => initialState,

        clearUserInfo: (state) => {
            state.first_name = null;
            state.last_name = null;
            state.role = null;
            state.accessToken = null;
        }
    }
});

export const {
    setUserInfo,
    setFirstName,
    setLastName,
    setRole,
    setAccessToken,
    resetUserInfo,
    clearUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

export const selectUserInfo = (state: {userInfo: UserInfo}) => state.userInfo;
export const selectFirstName = (state: { userInfo: UserInfo }) => state.userInfo.first_name;
export const selectLastName = (state: { userInfo: UserInfo }) => state.userInfo.last_name;
export const selectRole = (state: { userInfo: UserInfo }) => state.userInfo.role;
export const selectToken = (state: { userInfo: UserInfo }) => state.userInfo.accessToken;
