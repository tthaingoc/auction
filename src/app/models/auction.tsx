export interface Auction {
    title:         string;
    date:           Date;
    auctionStatus: number;
    creatorId:     number;
    managedId:     number;
    realEstates:   any[];
    id:            number;
}