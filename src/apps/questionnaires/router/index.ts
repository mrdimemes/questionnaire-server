import dotenv from "dotenv";
import { Router } from "express";
import controller from "../controller";

dotenv.config();

const router = Router();

router.get("/tags", controller.getTags.bind(controller));
router.get("/questionnaireCards",
  controller.getQuestionnaireCards.bind(controller));

export default router;