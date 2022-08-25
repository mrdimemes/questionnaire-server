import { Request, Response } from "express";
import { TagDTO } from "../DTOs";
import {
  TagConnector,
  QuestionnaireConnector,
  RelationConnector
} from "../mysql";

class QuestionnairesController {
  private tagConnector = TagConnector;
  private questionnaireConnector = QuestionnaireConnector;
  private relationConnector = RelationConnector;

  async getTags(_req: Request, res: Response, _next: Function) {
    const tags = await this.tagConnector.getTags();
    //not optimized
    const tagsDTOs = await Promise.all(tags.map(async (tag) => {
      const relations = await this.relationConnector.findQuestionnairesByTag(tag.id);
      return new TagDTO(tag.id, tag.label, relations.length);
    }))
    return res.json({ "tags": tagsDTOs });
  }
}

export default new QuestionnairesController();