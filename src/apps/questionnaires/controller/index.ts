import { Request, Response } from "express";
import { TagService } from "./services";

class QuestionnairesController {
  private tagService = TagService;

  async getTags(_req: Request, res: Response, _next: Function) {
    const tagDTOs = await this.tagService.getTags();
    return res.json({ "tags": tagDTOs });
  }
}

export default new QuestionnairesController();