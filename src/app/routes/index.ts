import express from "express";
import { messageRoutes } from "../modules/message/message.route";
import { questionRoutes } from "../modules/QuestionList/questionList.route";
import { userRoutes } from "../modules/User/user.routes";
import { hallRoomPostRoutes } from "../modules/hallRoomPost/hallRoom.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/message",
    route: messageRoutes,
  },
  {
    path: "/question",
    route: questionRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/hall_room_post",
    route: hallRoomPostRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
