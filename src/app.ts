/** @format */

import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/errors/notFound";
const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());


app.use('/api', router)

app.get("/", (req: Request, res: Response) => {
   res.send("Hello World!");
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;
