import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice(
    {
        name : 'authentication',
        initialState :{
            isUserAuthenticated : false,
            userEmail : '',
            userName : '',
            isAdmin:false,
            canCreateAdmin:false,
        },
        reducers : {
            login :(state,action) =>{
                localStorage.setItem('jwt_token', action.payload.token);
                localStorage.setItem('userEmail',action.payload.userEmail);
                localStorage.setItem('userName',action.payload.userName);
                localStorage.setItem('isAdmin',action.payload.isAdmin);
                localStorage.setItem('canCreateAdmin',action.payload.canCreateAdmin);
                state.isUserAuthenticated=true;
                state.userEmail=action.payload.userEmail;
                state.userName=action.payload.userName;
                state.isAdmin=action.payload.isAdmin;
                state.canCreateAdmin=action.payload.canCreateAdmin;
            },
            logout : (state) => {
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('userName');
                localStorage.removeItem('canCreateAdmin');
                state.isAdmin=false;
                state.isUserAuthenticated=false;
                state.userEmail='';
                state.userName='';
                state.canCreateAdmin=false;
            }
        }
    }
)

export const {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;