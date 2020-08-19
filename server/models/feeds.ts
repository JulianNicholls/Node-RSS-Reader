import { model, Schema } from 'mongoose';
import { Site } from '../types.d';

const siteSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export const SiteModel = model<Site>('site', siteSchema);
