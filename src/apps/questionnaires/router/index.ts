import dotenv from "dotenv";
import { Router } from "express";
import QuestionnaireController from "../controllers/QuestionnairesController";

dotenv.config();

const controller = QuestionnaireController;
const router = Router();

router.get("/tags", controller.getTags.bind(controller));

export default router;