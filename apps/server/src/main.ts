import dotenv from 'dotenv';
dotenv.config();
import ExpressApp from "./modules/express";
import { AppDataSource } from "./modules/db";


const app = ExpressApp.getInstance();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });


app.start(parseInt(process.env['PORT']!));

