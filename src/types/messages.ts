export interface UserMessage {
  type: 'user';
  content: string;
}

export interface BotMessage {
  type: 'bot';
  content: string;
  recipes: string[];
}

export interface ErrorMessage {
  type: 'error';
  content: string[];
}
