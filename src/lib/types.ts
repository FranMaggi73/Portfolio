export enum HttpStatus {
  OK = 200,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500
}

export type Word = {
  id: number;
  name: string;
  pronunciation: string;
  language_code: string;
};

export type ClassifiedWord = {
  id: number;
  word: string;
  gender_code: string;
  gender: string;
  classification_code: string;
  classification: string;
};

export type Genders = {
  id: number;
  name: string;
  language_code: string;
  code: string;
};

export type Classification = {
  ID: number;
  Name: string;
  Code: string;
};

export type Language = {
  id: number;
  name: string;
  code: string;
};

export type Preset = {
  id: number;
  name: string;
};

export type Translation = {
  id: number;
  word_details: {
    id: number;
    word: string;
    pronunciation: string;
    language_code: string;
    gender_code: string;
    classification_code: string;
  };
  translation_details: {
    id: number;
    word: string;
    pronunciation: string;
    language_code: string;
    gender_code: string;
    classification_code: string;
  };
};
