// var mongoose = require('mongoose');
import mongoose from 'mongoose';
import { values } from '../key';

const { db_password, db_username } = values;

console.log(db_password, db_username);

const mongo = mongoose
  .connect(
    `mongodb+srv://juwontayo:${db_password}@cluster0.da9kbia.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log('DB connection successful !'));

export default { mongo };
