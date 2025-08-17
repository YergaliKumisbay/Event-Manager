'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEvents } from '@/app/context/EventContext';
import EventForm from '@/app/components/EventForm/EventForm';
import type { Event, EventFormData } from '@/types/event';
import { useEffect, useState } from 'react';
import styles from '../EventFormPage.module.css';

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id: string };

    const { state, dispatch } = useEvents();
    const [event, setEvent] = useState<Event | null>(null);

    // дождёмся инициализации стора, затем найдём событие
    useEffect(() => {
        if (state.loading) return;
        const foundEvent = state.events.find((e) => e.id === id);
        if (foundEvent) {
            setEvent(foundEvent);
        } else {
            router.push('/events');
        }
    }, [id, state.events, state.loading, router]);

    const handleSubmit = (formData: EventFormData) => {
        if (!event) return;
        const updatedEvent: Event = {
            ...event,
            ...formData,
            // нормализуем дату в ISO для единообразия хранения
            date: new Date(formData.date).toISOString(),
        };
        dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
        router.push('/events');
    };

    if (!event) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Edit Event</h1>
                <button className={styles.backButton} onClick={() => router.push('/events')}>
                    &larr; Back to Events
                </button>
            </div>

            <EventForm
                initialData={{
                    title: event.title,
                    description: event.description || '',
                    // datetime-local требует формат YYYY-MM-DDTHH:mm (локальное время)
                    date: event.date.slice(0, 16),
                    category: event.category,
                    status: event.status,
                }}
                onSubmit={handleSubmit}
                onCancel={() => router.push('/events')}
            />
        </div>
    );
}
