export type UserMessage = {
  type: 'user';
  content: string;
};

export type BotMessage = {
  type: 'bot';
  content: string;
  recipes: string[];
};
