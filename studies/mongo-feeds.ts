import mongoose, { Document, model, Schema } from 'mongoose';
import { ljust } from 'justify-text';

interface Site extends Document {
  name: string;
  url: string;
}

const siteSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const SiteModel = model<Site>('site', siteSchema);

const mongoURI = 'mongodb://localhost/feeds';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(mongoURI, options)
  .then(() => {
    SiteModel.find({}, (err, docs) => {
      if (err) console.error(err);
      else {
        const longest = docs.reduce(
          (len, item) => Math.max(len, item.name.length),
          0
        );

        docs.forEach(({ name, url }) => {
          console.log(`${ljust(name, longest)}  ${url}`);
        });

        mongoose.disconnect();
      }
    });
  })
  .catch((error) => {
    console.error('Connection failure', { error });
  });
