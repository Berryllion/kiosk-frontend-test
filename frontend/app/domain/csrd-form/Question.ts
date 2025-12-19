export type QuestionType = "table" | "number" | "enum" | "text" | "section";
export type GenderType = "female" | "male" | "other";
export type UnitType = string | null;

export interface Question {
  readonly id: string;
  readonly kioskId: string;
  readonly labelEn: string;
  readonly labelFr: string;
  readonly type: QuestionType;
  readonly order: number;
  readonly relatedQuestionId: string | null;
  readonly unit: UnitType;
  readonly enumValues?: {
    readonly en: ReadonlyArray<string>;
    readonly fr: ReadonlyArray<string>;
  };
  readonly relatedQuestions?: ReadonlyArray<Question>;
}

export interface FormQuestion {
  readonly type: QuestionType;
  readonly id: string;
  readonly label: string;
  readonly relatedQuestions?: ReadonlyArray<Question>;
  readonly unit: UnitType;
  readonly enumValues?: ReadonlyArray<string>;
}

export interface TableQuestion {
  readonly id: string;
  readonly label: string;
  readonly relatedQuestions?: ReadonlyArray<Question>;
  readonly unit: UnitType;
}

export interface TitleQuestion {
  id: string;
  label: string;
  isRelatedQuestion?: boolean;
}
