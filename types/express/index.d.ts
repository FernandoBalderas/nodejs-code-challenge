declare namespace Express {
  export interface Request {
    userPayload?: {
      id: number;
      username: string;
    };
  }
}
