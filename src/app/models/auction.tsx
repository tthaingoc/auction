import { Product } from "./product";

export interface Auction {
    title:         string;
    date:           Date;
    auctionStatus: number;
    creatorId:     number;
    managedId:     number;
    realEstates:   Product[];
    id:            number;
}