import { Document } from 'mongoose';

export interface Site extends Document {
  name: string;
  url: string;
}
