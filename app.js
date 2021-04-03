import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import route from './route';
import cors from 'cors';
import config from './conflig/index';
const port = process.env.PORT || 5000;

const app = express();
const uri = process.env.MONGO_URL;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/',route);


app.listen(port, function () {
  console.log('listening to port 3000...');
});

export default app;