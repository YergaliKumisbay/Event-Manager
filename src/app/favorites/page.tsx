
'use client';

import { useState } from 'react';
import { useEvents } from '@/app/context/EventContext';
import EventList from '@/app/components/EventList/EventList';

export default function FavoritesPage() {
    const { state, dispatch } = useEvents();
    const [sort, setSort] = useState<{ field: 'date' | 'title'; order: 'asc' | 'desc' }>({
        field: 'date', order: 'asc'
    });

    const favorites = state.events.filter(e => e.isFavorite);

    return (
        <div>
            <h1 className="mb-4">Favorites</h1>
            <EventList
                events={favorites}
                filter={{}}
                sort={sort}
                search={''}
                onToggleFavorite={(id) => dispatch({ type: 'TOGGLE_FAVORITE', payload: id })}
            />
        </div>
    );
}
