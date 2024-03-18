import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { questionRoutes } from "./app/modules/QuestionList/questionList.route";
import { messageRoutes } from "./app/modules/message/message.route";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph health care server..",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/message", messageRoutes);

export default app;
