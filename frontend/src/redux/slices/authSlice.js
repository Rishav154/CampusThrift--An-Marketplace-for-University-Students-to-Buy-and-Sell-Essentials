import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || "",
        isAuthenticated: !!localStorage.getItem("token") || null,
    },
    reducers: {
        setUserLogin: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        setUserLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    }
});


export const {setUserLogin, setUserLogout} = authSlice.actions;


export default authSlice.reducer;