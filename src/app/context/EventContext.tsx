
'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Event } from '@/types/event';

type Action =
    | { type: 'INIT'; payload: Event[] }
    | { type: 'ADD_EVENT'; payload: Event }
    | { type: 'UPDATE_EVENT'; payload: Event }
    | { type: 'DELETE_EVENT'; payload: string }
    | { type: 'TOGGLE_FAVORITE'; payload: string };

type State = {
    events: Event[];
    loading: boolean;
};

const initialState: State = { events: [], loading: true };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'INIT':
            return { events: action.payload, loading: false };
        case 'ADD_EVENT':
            return { ...state, events: [...state.events, action.payload] };
        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map(e => (e.id === action.payload.id ? action.payload : e)),
            };
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter(e => e.id !== action.payload),
            };
        case 'TOGGLE_FAVORITE':
            return {
                ...state,
                events: state.events.map(e => (e.id === action.payload ? { ...e, isFavorite: !e.isFavorite } : e)),
            };
        default:
            return state;
    }
}

const EventContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

const LS_KEY = 'event-manager:events';

const seed: Event[] = [
    {
        id: '1',
        title: 'Tech Conference 2025',
        description: 'Annual tech conference on AI and ML',
        date: '2025-12-15T10:00:00.000Z',
        category: 'Конференция',
        status: 'Запланировано',
        isFavorite: false,
    },
    {
        id: '2',
        title: 'Team Meetup',
        description: 'Monthly team sync',
        date: '2025-09-30T14:00:00.000Z',
        category: 'Встреча',
        status: 'Запланировано',
        isFavorite: true,
    },
];

export function EventProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Hydrate from localStorage (or seed)
    useEffect(() => {
        try {
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(LS_KEY) : null;
            const parsed = raw ? (JSON.parse(raw) as Event[]) : seed;
            dispatch({ type: 'INIT', payload: parsed });
        } catch {
            dispatch({ type: 'INIT', payload: seed });
        }
    }, []);

    // Persist on change
    useEffect(() => {
        if (!state.loading) {
            window.localStorage.setItem(LS_KEY, JSON.stringify(state.events));
        }
    }, [state.events, state.loading]);

    // Auto-update statuses based on current time
    useEffect(() => {
        if (state.loading) return;
        const now = Date.now();
        const updated = state.events.map(e => {
            const isPast = new Date(e.date).getTime() < now;
            if (isPast && e.status !== 'Завершено') {
                return { ...e, status: 'Завершено' as const };
            }
            return e;
        });
        // Only dispatch if something changed
        const changed = JSON.stringify(updated) !== JSON.stringify(state.events);
        if (changed) {
            // Write directly to LS to avoid loops
            window.localStorage.setItem(LS_KEY, JSON.stringify(updated));
            // and set via INIT to avoid animation flicker
            dispatch({ type: 'INIT', payload: updated });
        }
    }, [state.events, state.loading]);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
    const ctx = useContext(EventContext);
    if (!ctx) throw new Error('useEvents must be used inside <EventProvider>');
    return ctx;
}
