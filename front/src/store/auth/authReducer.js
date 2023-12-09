// export interface AuthState {
//     authData: {
//         accessToken: string | null
//         isLoading: boolean
//         error:  string | null,
//     }
//     profileData: {
//         profile: string | null,
//             isLoading: boolean
//         error:  string | null,
//     }
// }
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    authData: {
        accessToken: null,
        isLoading: false,
        error: null,
    },
    profileData: {
        profile: null,
        isLoading: false,
        error: null,
    },
    userInfo: {
        imgUrl: "http://localhost:8080/users/defaultProfilePic.png",
        description: "",
        username: ""
    }
}

export const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginStart: (state) => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: true,
            }
        }),
        loginSuccess: (state, action) => ({
            ...state,
            authData: {
                ...state.authData,
                accessToken: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loginFailure: (state, action) => ({
            ...state,
            authData: {
                ...state.authData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadProfileStart: (state) => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: true,
            }
        }),
        loadProfileSuccess: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                profile: action.payload,
                isLoading: false,
                error: null,
            }
        }),
        loadProfileFailure: (state, action) => ({
            ...state,
            profileData: {
                ...state.profileData,
                isLoading: false,
                error: action.payload,
            }
        }),
        loadUserInfo: (state, action) => {
            return {
                ...state,
                userInfo: {
                    imgUrl: "http://localhost:8080" + action.payload.img_url,
                    description: action.payload.description,
                    username: action.payload.username
                }
            }
        },
        logoutSuccess: () => initialState,
    },
})

export const {
    loadProfileStart,
    loadProfileSuccess,
    loadProfileFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    loadUserInfo
} = authReducer.actions
