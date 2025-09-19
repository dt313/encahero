import { useMemo } from 'react';

import { ThemedText } from './ThemedText';
import MultipleChoice from './flashcards/multiple-choice';
import ReviewCard from './flashcards/review-card';
import TypingCard from './flashcards/typing-card';

export enum QuestionType {
    MULTI_CHOICE = 'multi_choice',
    RATING = 'rating',
    TYPING = 'typing',
}

export type Quiz = {
    en_word: string;
    vn_word: string;
    vn_choice: string[];
    en_choice: string[];
    meaning: string;
    ex: string[];
    image_url?: string;
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

export function randomQuestionType(): QuestionType {
    const types = Object.values(QuestionType);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

function RandomQuiz({ quiz }: { quiz: Quiz }) {
    const questionType = useMemo(() => randomQuestionType(), [quiz]);
    switch (questionType) {
        case QuestionType.MULTI_CHOICE:
            const direction: QuizDirection = Math.random() < 0.5 ? QuizDirection.E2V : QuizDirection.V2E;
            return <MultipleChoice quiz={quiz} type={direction} />;
        case QuestionType.RATING:
            return <ReviewCard quiz={quiz} />;
        case QuestionType.TYPING:
            return <TypingCard quiz={quiz} />;
        default:
            return <ThemedText>Question Type Error</ThemedText>;
    }
}

export default RandomQuiz;
