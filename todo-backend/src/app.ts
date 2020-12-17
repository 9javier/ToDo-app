import * as express from "express"
import { sequlize } from "./database";
import  router from './routes/routes';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 4000);
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(router);

app.listen(process.env.PORT || 4000, () => {
    console.log(`App runing at port ${process.env.PORT}`)
    sequlize.authenticate().then(async() => {
        console.log("database connected")

        try {
            await sequlize.sync({force: true})
        } catch (error) {
            console.log("Error",error.message)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})