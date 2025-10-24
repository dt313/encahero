import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';

import type { Quiz } from '@/types/quiz';
import { QuizDirection } from '@/types/quiz';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';

import MultipleChoice from './flashcards/multiple-choice';
import ReviewCard from './flashcards/review-card';
import TypingCard from './flashcards/typing-card';

export enum QuestionType {
    MULTI_CHOICE = 'multi_choice',
    RATING = 'rating',
    TYPING = 'typing',
}

export function randomQuestionType(): QuestionType {
    const types = Object.values(QuestionType);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
}

function RandomQuiz({
    quiz,
    isNew,
    onSubmit,
}: {
    quiz: Quiz;
    onSubmit: (quizType: QuestionType, cardId: number, rating?: 'E' | 'M' | 'H') => void;
    isNew: boolean;
}) {
    const [questionType, setQuestionType] = useState<QuestionType | null>(null);
    const queryClient = useQueryClient();
    const isSubmittingRef = useRef(false);
    useEffect(() => {
        if (isNew) {
            setQuestionType(QuestionType.RATING);
        } else {
            setQuestionType(randomQuestionType());
        }
        isSubmittingRef.current = false;
    }, [quiz, isNew]);

    const debouncedSubmit = useMemo(
        () =>
            debounce(
                (rating?: 'E' | 'M' | 'H') => {
                    if (questionType) {
                        onSubmit(questionType, quiz.id, rating);
                        setQuestionType(null);
                        queryClient.setQueryData(['userStatsDailyAndWeekly'], (old: any) => {
                            if (!old) return old;
                            return {
                                ...old,
                                today: (old.today ?? 0) + 1,
                                week: (old.week ?? 0) + 1,
                            };
                        });

                        queryClient.setQueryData(['contribution'], (old: any[] | undefined) => {
                            if (!old) return old;

                            const today = new Date().toISOString().split('T')[0];
                            let found = false;

                            const newData = old.map((item) => {
                                if (item.date === today) {
                                    found = true;
                                    return { ...item, count: (item.count || 0) + 1 };
                                }
                                return item;
                            });

                            if (!found) newData.push({ date: today, count: 1 });
                        });
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
            return <ReviewCard quiz={quiz} onSubmit={debouncedSubmit} isNew={isNew} />;

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

export default memo(RandomQuiz);
