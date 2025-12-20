import _ from "lodash";
import type { DisclosureRequirement } from "../../domain/csrd-form/DisclosureRequirement";
import type {
  CreateQuestionAnswerDTO,
  QuestionAnswer,
} from "../../domain/csrd-form/QuestionAnswer";
import { QuestionAnswerRepository } from "../../infrastructure/database/QuestionAnswerRepository";
import drData from "../../data/disclosure-requirement.json";

export class CSRDFormService {
  private readonly questionAnswerRepository: QuestionAnswerRepository;

  constructor() {
    this.questionAnswerRepository = new QuestionAnswerRepository();
  }

  getDisclosureRequirement(): DisclosureRequirement {
    return drData as DisclosureRequirement;
  }

  formDataToQuestionAnswerDTO(formData: FormData): CreateQuestionAnswerDTO[] {
    const questionAnswerDTOlist: CreateQuestionAnswerDTO[] = [];
    const answerMap = new Map();

    for (const [inputName, inputValue] of formData.entries()) {
      const answerDepths = inputName.split(".");
      const questionId = answerDepths.splice(0, 1)[0];

      let currentValue = answerMap.get(questionId) || {};

      if (answerMap.has(questionId)) {
        _.set(currentValue, answerDepths, inputValue);
      } else {
        if (answerDepths.length) {
          _.set(currentValue, answerDepths, inputValue);
        } else {
          currentValue = inputValue;
        }

        answerMap.set(questionId, currentValue);
      }
    }

    answerMap.forEach((value, key) =>
      questionAnswerDTOlist.push({
        questionId: key,
        answer: value,
      }),
    );

    return questionAnswerDTOlist;
  }

  async saveAnswer(dto: CreateQuestionAnswerDTO): Promise<QuestionAnswer> {
    return this.questionAnswerRepository.create(dto);
  }

  async saveAnswers(
    dtos: ReadonlyArray<CreateQuestionAnswerDTO>,
  ): Promise<ReadonlyArray<QuestionAnswer>> {
    return this.questionAnswerRepository.createMany(dtos);
  }

  async getAnswerByQuestionId(
    questionId: string,
  ): Promise<QuestionAnswer | null> {
    return this.questionAnswerRepository.findByQuestionId(questionId);
  }
}
