import dotenv from "dotenv";
import { Request, Response } from "express";
import { TagService, QuestionnaireService } from "./services";
import { CardPageRequestBody } from "../types";

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

  async getQuestionnaireCards(req: Request, res: Response, _next: Function) {
    const { startPage, cardsPerPage } = req.body as CardPageRequestBody;
    const questionnaireCardDTOs = await this.questionnaireService
      .getQuestionnaireCardPage(
        startPage,
        Math.min(cardsPerPage, this.maxCardsPerPage)
      );
    return res.json(questionnaireCardDTOs);
  }

  async getQuestionnaire(req: Request, res: Response, _next: Function) {
    const questionnaireDTO = await this.questionnaireService
      .getQuestionnaire(Number(req.params.id));
    return res.json(questionnaireDTO);
  }
}

export default new QuestionnairesController();