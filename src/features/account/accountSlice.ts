import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.currentUser();                      
            localStorage.setItem('user', JSON.stringify(userDto));
            return userDto;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }, 
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)


// export const fetchCurrentUser = createAsyncThunk<User>(
//     'account/fetchCurrentUser',
//     async (_, thunkAPI) => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             try {
//                 const user = JSON.parse(storedUser);
//                 // Authenticate user using stored token
//                 // For example:
//                 // const user = await agent.Account.authenticate(userToken);
//                 // where `userToken` is stored in user.token
//                 return user;
//             } catch (error) {
//                 // If there's an error during authentication, clear local storage
//                 localStorage.removeItem('user');
//                 return thunkAPI.rejectWithValue({ error: 'Authentication failed' });
//             }
//         } else {
//             return thunkAPI.rejectWithValue({ error: 'User not found in local storage' });
//         }
//     },
//     {
//                 condition: () => {
//                     if(!localStorage.getItem('user')) return false;
//                 }
//             }
// );

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user')
            router.navigate('/login')           
        },
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles}
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Please login again');
            router.navigate('/login')
            
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled), (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles}
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action)=>{
            console.log(action.payload)
        })
    })
    })

    export const {setUser, signOut} = accountSlice.actions;

