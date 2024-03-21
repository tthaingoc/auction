export interface Product {
    id:                 number;
    code:               string;
    name:               string;
    price:              number;
    startPrice:         number;
    acreage:            number;
    address:            string;
    province:           string;
    description:        string;
    dateSubmited?:       Date;
    isAvailable:        boolean;
    startTime?:          Date;
    endTime?:            Date;
    realEstateStatus:   number;
    accountId:          number;
    typeOfRealEstateId: number;
    typeOfRealEstate:   TypeOfRealEstate;
    auctionId:          number;
    image?: FileList;
}

export interface TypeOfRealEstate {
    id:          number;
    name:        string;
    realEstates: string[];
}
