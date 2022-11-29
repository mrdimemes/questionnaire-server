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
router.post("/addTag", controller.addTag.bind(controller));
router.post("/removeTag", controller.removeTag.bind(controller));
router.post("/addQuestionnaire", controller.addQuestionnaire.bind(controller));
router.post(
  "/editQurstionnaire",
  controller.editQuestionnaire.bind(controller),
);


export default router;