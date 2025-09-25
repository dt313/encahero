import { useEffect, useMemo, useRef, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';

import debounce from 'lodash.debounce';

import MultipleChoice from './flashcards/multiple-choice';
import ReviewCard from './flashcards/review-card';
import TypingCard from './flashcards/typing-card';

export enum QuestionType {
    MULTI_CHOICE = 'multi_choice',
    RATING = 'rating',
    TYPING = 'typing',
}

export type Quiz = {
    id: number;
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

function RandomQuiz({
    quiz,
    onSubmit,
}: {
    quiz: Quiz;
    onSubmit: (quizType: QuestionType, cardId: number, rating?: 'E' | 'M' | 'H') => void;
}) {
    const [questionType, setQuestionType] = useState<QuestionType | null>(null);
    const isSubmittingRef = useRef(false);
    useEffect(() => {
        console.log('call');
        setQuestionType(randomQuestionType());
        isSubmittingRef.current = false;
    }, [quiz]);

    const debouncedSubmit = useMemo(
        () =>
            debounce(
                (rating?: 'E' | 'M' | 'H') => {
                    if (questionType) {
                        onSubmit(questionType, quiz.id, rating);
                        setQuestionType(null);
                    }
                },
                500,
                { leading: true, trailing: false },
            ),
        [quiz, questionType, onSubmit],
    );

    switch (questionType) {
        case QuestionType.MULTI_CHOICE:
            const direction: QuizDirection = Math.random() < 0.5 ? QuizDirection.E2V : QuizDirection.V2E;
            return <MultipleChoice quiz={quiz} type={direction} onSubmit={debouncedSubmit} />;

        case QuestionType.RATING:
            return <ReviewCard quiz={quiz} onSubmit={debouncedSubmit} />;

        case QuestionType.TYPING:
            return <TypingCard quiz={quiz} onSubmit={debouncedSubmit} />;
        default:
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <Text>
                        <ActivityIndicator style={{ marginTop: 50 }} />;
                    </Text>
                </View>
            );
    }
}

export default RandomQuiz;
