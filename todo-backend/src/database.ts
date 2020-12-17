import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';

dotenv.config();
export const sequlize = new Sequelize('todo', `${process.env.USER_DB}`, `${process.env.PASSWORD}`, {
   host: 'localhost',
   dialect: 'mysql',
   models: [__dirname + '/models'] 
});