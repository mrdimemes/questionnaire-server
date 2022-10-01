import { Router } from "express";
import controller from "../controller";

const router = Router();

router.get("/tags", controller.getTags.bind(controller));
router.get("/questionnaireCards",
  controller.getQuestionnaireCards.bind(controller));
router.get("/questionnaire/:id", controller.getQuestionnaire.bind(controller));
router.post(
  "/saveAnswer",
  controller.saveQuestionnaireAnswer.bind(controller)
);

export default router;