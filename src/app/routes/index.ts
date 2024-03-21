import express from "express";
import { messageRoutes } from "../modules/message/message.route";
import { questionRoutes } from "../modules/QuestionList/questionList.route";
import { userRoutes } from "../modules/User/user.routes";
import { hallRoomPostRoutes } from "../modules/hallRoomPost/hallRoom.route";
import { paidImageRoutes } from "../modules/paidImage/paidImage.route";
import { paidVideoRoutes } from "../modules/paidVideo/paidVideo.route";
import { clientRoutes } from "../modules/client/client.routes";
import { employeeRoutes } from "../modules/employee/employee.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { locationRoutes } from "../modules/location/location.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/locations",
    route: locationRoutes,
  },
  {
    path: "/message",
    route: messageRoutes,
  },
  {
    path: "/question",
    route: questionRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/client",
    route: clientRoutes,
  },
  {
    path: "/employee",
    route: employeeRoutes,
  },
  {
    path: "/hall_room_post",
    route: hallRoomPostRoutes,
  },
  {
    path: "/paid_image",
    route: paidImageRoutes,
  },
  {
    path: "/paid_video",
    route: paidVideoRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
