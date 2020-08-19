import express from 'express';
import mongoose from 'mongoose';

import apiRoutes from './routes';

const app = express();

const port = process.env.PORT || 3100;

app.use(express.json());

mongoose
  .connect('mongodb://localhost/feeds', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to local Mongo');

    app.use('/api/feeds', apiRoutes);

    app.listen(port, () => {
      console.log('Server listening on port', port);
    });
  })
  .catch((err) => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  });
