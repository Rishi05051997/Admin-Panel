
export class Associate {
    "_id": string;
    "item": string;
    "qty": number;
    "date": Date;
    "due": Date;
    "tax": number;
    "rate": number;
  }
  export class AssociatePaginationRsp {
    "docs": Associate[];
    "total": number;
    "pages": number;
    "page": number;
    "limit": number;
  }
