import dotenv from "dotenv";
import { Request, Response } from "express";
import { TagService, QuestionnaireService, AnswerService } from "./services";
import {
  GetCardsRequest,
  SaveAnswerRequestBody,
  AddTagRequestBody,
  RemoveTagRequestBody
} from "../types";

dotenv.config();


class QuestionnairesController {
  private tagService = TagService;
  private questionnaireService = QuestionnaireService;
  private answerService = AnswerService;
  private maxCardsPerPage =
    Number(process.env.MAX_QUESTIONNAIRE_CARDS_PER_PAGE ?? "50");

  async getTags(_req: Request, res: Response, _next: Function) {
    const tagDTOs = await this.tagService.getTags();
    return res.json(tagDTOs);
  }

  async addTag(req: Request, res: Response, next: Function) {
    try {
      const { label } = req.body as AddTagRequestBody;
      await this.tagService.addTag(label);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async removeTag(req: Request, res: Response, next: Function) {
    try {
      const { tagId } = req.body as RemoveTagRequestBody;
      await this.tagService.removeTag(tagId);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async getQuestionnaireCards(req: GetCardsRequest, res: Response, _next: Function) {
    const { startPage, cardsPerPage } = req.query;
    const page = await this.questionnaireService
      .getQuestionnaireCardPage(
        startPage ?? 1,
        Math.min(cardsPerPage ?? 10, this.maxCardsPerPage)
      );
    return res.json(page);
  }

  async getQuestionnaire(req: Request, res: Response, _next: Function) {
    const questionnaireDTO = await this.questionnaireService
      .getQuestionnaire(Number(req.params.id));
    return res.json(questionnaireDTO);
  }

  async saveQuestionnaireAnswer(req: Request, res: Response, next: Function) {
    try {
      const { userId, answer } =
        req.body as SaveAnswerRequestBody;
      await this.answerService.saveAnswer(answer, userId);
      return res.json();
    } catch (err) {
      next(err);
    }
  }
}

export default new QuestionnairesController();