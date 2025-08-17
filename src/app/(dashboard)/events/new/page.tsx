'use client';

import { useRouter } from 'next/navigation';
import EventForm from '@/app/components/EventForm/EventForm';
import type { Event, EventFormData } from '@/types/event';
import { useEvents } from '@/app/context/EventContext';

export default function NewEventPage() {
    const { dispatch } = useEvents();
    const router = useRouter();

    const handleSubmit = (formData: EventFormData) => {
        const newEvent: Event = {
            id: crypto.randomUUID(),
            title: formData.title.trim(),
            description: formData.description?.trim() || '',
            date: new Date(formData.date).toISOString(),
            category: formData.category,
            status: formData.status,
            isFavorite: false,
        };
        dispatch({ type: 'ADD_EVENT', payload: newEvent });
        router.push('/events');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Новое событие</h1>
                <button className="text-[#0070f3]" onClick={() => router.push('/events')}>&larr; Назад</button>
            </div>
            <EventForm onSubmit={handleSubmit} onCancel={() => router.push('/events')} />
        </div>
    );
}
