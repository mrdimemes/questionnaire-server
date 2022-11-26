import { Request } from "express";


type CardsReqQuery = {
  startPage?: number;
  cardsPerPage?: number;
  sortOption?: string;
  searchPhrase?: string;
  filterTag?: number;
};

type GetCardsRequest = Request<any, any, any, CardsReqQuery>;

export default GetCardsRequest;