export type Quiz = {
    id: number;
    en_word: string;
    vn_word: string;
    vn_choice: string[];
    en_choice: string[];
    meaning: string;
    ex: string[];
    image_url?: string;
    phonetic: string;
    type:
        | 'noun'
        | 'verb'
        | 'adjective'
        | 'adverb'
        | 'pronoun'
        | 'preposition'
        | 'conjunction'
        | 'interjection'
        | 'phrase'
        | 'idiom'
        | 'other';
};

export enum QuizDirection {
    E2V = 'e2v',
    V2E = 'v2e',
}

export enum AnswerState {
    UNSET = 'UNSET',
    FALSE = 'FALSE',
    TRUE = 'TRUE',
}

export type AnswerType = {
    text: string;
    state: AnswerState;
};

export type ReviewAnswerType = {
    title: string;
    name: 'E' | 'M' | 'H';
    icon: string;
};
