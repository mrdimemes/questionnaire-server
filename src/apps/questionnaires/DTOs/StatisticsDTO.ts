import { AnswerDTO } from "./";


class StatisticsDTO {
  userId: number;
  totalAnswers: number;
  weekAnswers: number;
  monthAnswers: number;
  yearAnswers: number;
  lastAnswers: AnswerDTO[];

  constructor(
    userId: number,
    totalAnswers: number,
    weekAnswers: number,
    monthAnswers: number,
    yearAnswers: number,
    lastAnswers: AnswerDTO[],
  ) {
    this.userId = userId;
    this.totalAnswers = totalAnswers;
    this.weekAnswers = weekAnswers;
    this.monthAnswers = monthAnswers;
    this.yearAnswers = yearAnswers;
    this.lastAnswers = lastAnswers;
  }
}

export default StatisticsDTO