import { TagConnector, RelationConnector } from "../../mysql";
import { TagDTO } from "../../DTOs";

class TagService {
  private tagConnector = TagConnector;
  private relationConnector = RelationConnector;

  async addTag(label: string) {
    await this.tagConnector.addTag(label)
  }

  async removeTag(tagId: number) {
    await this.relationConnector.removeQuestionnaireTagRelationsByTagId(tagId);
    await this.tagConnector.removeTag(tagId);
  }

  async getTags() {
    const tags = await this.tagConnector.getTags();
    // !!! not optimized
    return Promise.all(tags.map(async (tag) => {
      const relations = await this.relationConnector
        .findQuestionnaireTagRelationsByTagId(tag.id);
      return new TagDTO(tag.id, tag.label, relations.length);
    }))
  }
}

export default new TagService();