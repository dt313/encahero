import { CollectionProgress } from '@/store/reducers/learning-list-reducer';

export default function checkNewMode(currentCollection: CollectionProgress) {
    const {
        learned_card_count,
        mastered_card_count,
        daily_new_limit,
        today_new_count,
        today_learned_count,
        task_count,
        collection,
    } = currentCollection;

    const hasMoreNewCards = learned_card_count === 0 || learned_card_count < daily_new_limit;
    const hasNotFinishedCollection = learned_card_count < collection.card_count;

    const canLearnNewToday =
        today_new_count < daily_new_limit &&
        collection.card_count > learned_card_count &&
        (today_learned_count >= task_count ||
            (learned_card_count === mastered_card_count && mastered_card_count < collection.card_count));

    if (hasMoreNewCards && hasNotFinishedCollection) return true;
    if (canLearnNewToday) return true;
    else return false;
}
