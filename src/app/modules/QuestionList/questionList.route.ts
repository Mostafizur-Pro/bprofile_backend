import express from "express";
import { QuestionListController } from "./questionList.controller";

const router = express.Router();

router.get('/', QuestionListController.getAllQuestionLists);
router.get("/:id", QuestionListController.getQuestionListById);
router.post("/", QuestionListController.createQuestionList);
router.put('/:id', QuestionListController.updateQuestionList);
router.delete("/:id", QuestionListController.deleteQuestionList);

export const questionRoutes = router;
