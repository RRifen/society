import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth/authReducer";


import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        auth: authReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ? [logger] : [])),
})