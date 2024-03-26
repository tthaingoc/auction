import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from '../../app/store/configureStore';
import { Auction } from "../../app/models/auction";

const auctionsAdapter = createEntityAdapter<Auction>();

export const fetchAuctionsAsync = createAsyncThunk<Auction[]>(
    'auction/fetchAuctionsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Auction.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchAuctionAsync = createAsyncThunk<Auction, number>(
    'auction/fetchAuctionAsync',
    async (auctionId, thunkAPI) => {
        try {
            const auction = await agent.Auction.details(auctionId);
            return auction;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const auctionSlice = createSlice({
    name: 'auction',
    initialState: auctionsAdapter.getInitialState({
        auctionLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setAuction: (state, action) =>{
            auctionsAdapter.upsertOne(state, action.payload);
            state.auctionLoaded = false;
        },
        removeAuction: (state, action) => {
            auctionsAdapter.removeOne(state, action.payload);
            state.auctionLoaded = false;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAuctionsAsync.pending, (state) => {
            state.status = 'pending'
        });
        builder.addCase(fetchAuctionsAsync.fulfilled, (state, action) => {
            auctionsAdapter.setAll(state, action.payload);
            state.status = 'idle',
            state.auctionLoaded = true;
        });
        builder.addCase(fetchAuctionsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchAuctionAsync.fulfilled, (state, action) => {
            auctionsAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchAuctionAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle'
        })
    })
})

export const auctionSelector = auctionsAdapter.getSelectors((state: RootState) => state.auction);
export const {setAuction, removeAuction} = auctionSlice.actions