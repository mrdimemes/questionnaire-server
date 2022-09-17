import dotenv from "dotenv";
import { Request, Response } from "express";
import { TagService, QuestionnaireService } from "./services";
import { GetCardsRequest } from "../types";

dotenv.config();


class QuestionnairesController {
  private tagService = TagService;
  private questionnaireService = QuestionnaireService;
  private maxCardsPerPage =
    Number(process.env.MAX_QUESTIONNAIRE_CARDS_PER_PAGE ?? "50");

  async getTags(_req: Request, res: Response, _next: Function) {
    const tagDTOs = await this.tagService.getTags();
    return res.json(tagDTOs);
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
}

export default new QuestionnairesController();