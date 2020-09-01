import express from 'express';
import mongoose from 'mongoose';

import feedRoutes from './routes/feeds';
import siteRoutes from './routes/sites';

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

    app.use('/api/feeds', feedRoutes);
    app.use('/api/site', siteRoutes);

    if (process.env.NODE_ENV === 'production') {
      // Express will serve up production assets,
      // i.e. mainXXX.js and mainXXX.css
      app.use(express.static('build'));

      // Express will serve up the index.html file
      // if it doesn't recognise the route
      const path = require('path');
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
      });
    }

    app.listen(port, () => {
      console.log('Server listening on port', port);
    });
  })
  .catch((err) => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  });
