import { Router } from "express";
import { Document, Types } from "mongoose";

export interface IRouteSchema {
  path: string;
  route: Router;
}

export interface IRequestWithActiveDetails extends Request {
  userId: string;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
}

export interface IFileObject {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  destination?: string;
  filename?: string;
  path?: string;
  size?: number;
}

export interface IReqFiles {
  [key: string]: IFileObject[];
}

export type RequireExactlyOne<T, K extends keyof T = keyof T> = {
  [P in K]-?: {
    [Q in P]: T[Q];
  } & Partial<Omit<T, P>>;
};

export type TDocumentType<T> = Document<unknown, object, T> &
  T & {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  };

export interface IMediaFileDimension {
  width: number;
  height: number;
}

export interface IVerifyEmailTokenData {
  email: string;
  userId: string;
}
