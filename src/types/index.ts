// 题目选项类型
export interface QuestionOption {
  id: string;
  text: string;
  type: string;
}

// 问题类型
export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

// 用户选择记录
export interface UserAnswer {
  questionId: number;
  optionId: string;
  optionType: string;
}