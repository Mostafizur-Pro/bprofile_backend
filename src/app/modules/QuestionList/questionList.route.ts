import express from "express";
import { QuestionListController } from "./questionList.controller";

const router = express.Router();

// router.get('/', QuestionListController.getAllQuestionLists);
// router.get('/:id', questionListController.getQuestionListById);
router.post("/", QuestionListController.createQuestionList);
// router.put('/:id', questionListController.updateQuestionList);
// router.delete('/:id', questionListController.deleteQuestionList);

export const questionRoutes = router;
