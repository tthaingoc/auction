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

export const SignInUser = createAsyncThunk<User, FieldValues>(
    'Account/Login',
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
    'Account/GetAccountById/profile',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user')
            router.navigate('/')           
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Please login again');
            router.navigate('/login')
            
        })
        builder.addMatcher(isAnyOf(SignInUser.fulfilled,fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload
        });
        builder.addMatcher(isAnyOf(SignInUser.rejected), (state, action)=>{
            console.log(action.payload)
        })
    })
    })

    export const {setUser, signOut} = accountSlice.actions;

