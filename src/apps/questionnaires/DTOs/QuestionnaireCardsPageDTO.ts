import QuestionnaireCardDTO from "./QuestionnaireCardDTO";

class QuestionnaireCardsPageDTO {
  cards: QuestionnaireCardDTO[];
  totalPages: number;

  constructor(cards: QuestionnaireCardDTO[], totalPages: number) {
    this.cards = cards;
    this.totalPages = totalPages;
  }
}

export default QuestionnaireCardsPageDTO