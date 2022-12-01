import { Router } from "express";
import controller from "../controller";
import {
  authMiddleware,
  adminRightsMiddleware,
} from "src/apps/auth/middlewares";

const router = Router();

router.get("/tags", controller.getTags.bind(controller));
router.get(
  "/questionnaireCards",
  controller.getQuestionnaireCards.bind(controller),
);
router.get("/questionnaire/:id", controller.getQuestionnaire.bind(controller));
router.post(
  "/saveAnswer",
  controller.saveQuestionnaireAnswer.bind(controller)
);
router.post(
  "/addTag",
  adminRightsMiddleware,
  controller.addTag.bind(controller),
);
router.post(
  "/removeTag",
  adminRightsMiddleware,
  controller.removeTag.bind(controller),
);
router.post(
  "/addQuestionnaire",
  adminRightsMiddleware,
  controller.addQuestionnaire.bind(controller),
);
router.post(
  "/editQuestionnaire",
  adminRightsMiddleware,
  controller.editQuestionnaire.bind(controller),
);
router.get(
  "/getAnswers/:id",
  adminRightsMiddleware,
  controller.getAnswers.bind(controller),
);
router.get(
  "/getStatistics/:id",
  authMiddleware,
  controller.getStatistics.bind(controller),
);

export default router;