import dotenv from "dotenv";
import { Request, Response } from "express";
import { TagService, QuestionnaireService, AnswerService } from "./services";
import {
  GetCardsRequest,
  SaveAnswerRequestBody,
  AddTagRequestBody,
  RemoveTagRequestBody,
  AddQuestionnaireRequestBody,
  EditQuestionnaireRequestBody,
} from "../types";
import { SortOption } from "../models";

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
      const tagId = await this.tagService.addTag(label);
      return res.json(tagId);
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

  async getQuestionnaireCards(
    req: GetCardsRequest,
    res: Response,
    _next: Function,
  ) {
    const {
      sortOption,
      searchPhrase,
      filterTag,
      startPage,
      cardsPerPage,
    } = req.query;
    const page = await this.questionnaireService
      .getQuestionnaireCardPage(
        Object.values(SortOption).includes(sortOption as SortOption) ?
          sortOption as SortOption :
          null,
        searchPhrase ?? "",
        filterTag ?? null,
        startPage ?? 1,
        Math.min(cardsPerPage ?? 10, this.maxCardsPerPage),
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

  async addQuestionnaire(req: Request, res: Response, next: Function) {
    try {
      const { questionnaire } = req.body as AddQuestionnaireRequestBody;
      const response = await this.questionnaireService.addQuestionnaire(
        questionnaire.label,
        questionnaire.label,
        questionnaire.questions.map(questionDTO => {
          return {
            questionType: questionDTO.questionType,
            text: questionDTO.text,
            isRequired: questionDTO.isRequired,
            fields: questionDTO.fields.map(fieldDTO => fieldDTO.text),
          };
        }),
        questionnaire.tags,
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async editQuestionnaire(req: Request, res: Response, next: Function) {
    try {
      const { questionnaire } = req.body as EditQuestionnaireRequestBody;
      await this.questionnaireService.editQuestionnaire(questionnaire);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async getAnswers(req: Request, res: Response, _next: Function) {
    const answers = await this.answerService.getAnswers(Number(req.params.id));
    return res.json(answers);
  }
}

export default new QuestionnairesController();