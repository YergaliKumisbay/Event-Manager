export type Category = 'Конференция' | 'Вебинар' | 'Встреча';
export type Status = 'Запланировано' | 'Завершено';

export interface Event {
    id: string;
    title: string;
    description?: string;
    date: string; // ISO string
    category: Category;
    status: Status;
    isFavorite?: boolean;
}

export type EventFormData = Omit<Event, 'id' | 'isFavorite' | 'status'> & { status: Status };
