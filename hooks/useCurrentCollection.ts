import { useEffect, useMemo, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';

import { CollectionProgress } from '@/store/reducers/learning-list-reducer';

export function useCurrentCollection(collections: CollectionProgress[] | undefined) {
    const { id } = useLocalSearchParams();
    const [currentCollection, setCurrentCollection] = useState<CollectionProgress>();

    // ✅ Tự động chọn ID phù hợp
    const collectionId = useMemo(() => {
        if (!collections) return undefined;

        if (id) {
            const current = collections.find((c) => c.collection_id === Number(id));
            if (current && current.status !== 'stopped') return Number(id);
        }

        const active = collections.find((c) => c.status === 'in_progress');
        return active?.collection_id;
    }, [id, collections]);

    // ✅ Cập nhật collection hiện tại
    useEffect(() => {
        if (!collectionId || !collections) return;
        const collection = collections.find((c) => c.collection_id === collectionId && c.status !== 'stopped');
        setCurrentCollection(collection);
    }, [collectionId, collections]);

    return { currentCollection, collectionId };
}
