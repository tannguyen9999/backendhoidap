import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import route from './route';
import cors from 'cors';
import config from './conflig/index';
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(
  config.mongo.url,
  (err) => {
    if (err) {
      console.log(err);
      process.exit(0);
    } else {
      console.log('connect mongodb success');
    }
  }
);
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/',route);


app.listen(port, function () {
  console.log('listening to port 3000...');
});

export default app;