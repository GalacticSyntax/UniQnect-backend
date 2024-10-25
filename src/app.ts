import { globalErrorHandler } from "./app/middlewares/global.error.handler";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import IndexRoute from "./app/routes";
import { notFound } from "./app/middlewares/notFound";

const app: Application = express();

/*
 *
 * middlewares
 *
 */
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: ["http://localhost:5173"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
 *
 * custom middlewares
 *
 */

// application routes
app.use("/api/v1", IndexRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.get("*", notFound);

app.use(globalErrorHandler);

export default app;
