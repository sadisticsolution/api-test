import bluebird from 'bluebird';
import compression from 'compression';  // compresses requests
import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI } from './util/secrets';

// Controllers (route handlers)
import * as adminController from './controllers/admin';
import * as servantController from './controllers/servant';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
  )
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());

/**
 * Primary app routes.
 */
app.get('/import', adminController.doImport);
app.get('/servant/:servantId', servantController.getServant);

export default app;
