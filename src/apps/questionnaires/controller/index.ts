import { Request, Response } from "express";
import { TagService, QuestionnaireService } from "./services";

class QuestionnairesController {
  private tagService = TagService;
  private questionnaireService = QuestionnaireService;

  async getTags(_req: Request, res: Response, _next: Function) {
    const tagDTOs = await this.tagService.getTags();
    return res.json({ "tags": tagDTOs });
  }

  async getQuestionnaireCards(_req: Request, res: Response, _next: Function) {
    const questionnaireCardDTOs = await this.questionnaireService
      .getQuestionnaireCards();
    return res.json({ "questionnaires": questionnaireCardDTOs });
  }

  async getQuestionnaire(req: Request, res: Response, _next: Function) {
    const questionnaireDTO = await this.questionnaireService
      .getQuestionnaire(Number(req.params.id));
    return res.json({ "questionnaire": questionnaireDTO });
  }
}

export default new QuestionnairesController();