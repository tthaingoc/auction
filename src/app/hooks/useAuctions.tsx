import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { auctionSelector, fetchAuctionsAsync } from "../../features/auction/auctionSlice";

export default function useAuctions() {
    const auctions = useAppSelector(auctionSelector.selectAll);
    const dispatch = useAppDispatch();
    const { auctionLoaded} = useAppSelector(state => state.auction);

    useEffect(() => {
        if (!auctionLoaded) dispatch(fetchAuctionsAsync());
    }, [dispatch, auctionLoaded])

    return {
        auctions,
        auctionLoaded
    }
}