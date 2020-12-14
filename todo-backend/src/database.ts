import {Sequelize} from "sequelize-typescript";

export const sequlize = new Sequelize('todo', 'root', '12345', {
   host: 'localhost',
   dialect: 'mysql',
   models: [__dirname + '/models'] 
});