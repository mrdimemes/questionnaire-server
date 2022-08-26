import { TagConnector, RelationConnector } from "../../mysql";
import { TagDTO } from "../../DTOs";

class TagService {
  private tagConnector = TagConnector;
  private relationConnector = RelationConnector;

  async addTag(label: string) {
    await this.tagConnector.addTag(label)
  }

  async removeTag(id: number) {
    await this.tagConnector.removeTag(id)
  }

  async getTags() {
    const tags = await this.tagConnector.getTags();
    // !!! not optimized
    return Promise.all(tags.map(async (tag) => {
      const relations = await this.relationConnector
        .findQuestionnairesByTag(tag.id);
      return new TagDTO(tag.id, tag.label, relations.length);
    }))
  }
}

export default new TagService();