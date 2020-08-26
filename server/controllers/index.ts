import { SiteModel } from '../models/feeds';

const feeds = async () => {
  try {
    return SiteModel.find({});
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { feeds };
