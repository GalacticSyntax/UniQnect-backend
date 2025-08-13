import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface ISession {
  running: string;
  previous: string | null;
}

export interface ISessionModel extends Model<ISession> {
  createCurriculumMethod(text: ISession): Promise<TDocumentType<ISession>>;
}
