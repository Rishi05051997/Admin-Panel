
export class Associate {
    "_id": string;
    "empId": string;
    "name": string;
    "email": string;
    "status": boolean;
    "location": string;
    "role": string;
    "pasword": string;
  }
  export class AssociatePaginationRsp {
    "docs": Associate[];
    "total": number;
    "pages": number;
    "page": number;
    "limit": number;
  }
