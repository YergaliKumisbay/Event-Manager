'use client';

import React from 'react';
import { Event } from '@/types/event';
import styles from './EventList.module.css';
import Link from 'next/link';
import Button from '../UI/Button';
import { format } from 'date-fns';

interface EventItemProps {
    event: Event;
    onDelete: () => void;
    onToggleFavorite: (id: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onDelete, onToggleFavorite }) => {
    const eventDate = new Date(event.date);

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventHeader}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                {event.isFavorite && <span className={styles.favoriteStar}>★</span>}
            </div>

            <div className={styles.eventDetails}>
                <p><strong>Дата:</strong> {format(eventDate, 'dd.MM.yyyy HH:mm')}</p>
                <p>
          <span className={`${styles.chip} ${styles.categoryChip}`}>
            {event.category}
          </span>
                </p>
                <p>
          <span
              className={`${styles.chip} ${
                  event.status === 'Завершено' ? styles.completed : styles.planned
              }`}
          >
            {event.status}
          </span>
                </p>
                {event.description && <p className={styles.description}>{event.description}</p>}
            </div>

            <div className={styles.eventActions}>
                <Button
                    variant={event.isFavorite ? 'primary' : 'secondary'}
                    onClick={() => onToggleFavorite(event.id)}
                    size="small"
                >
                    {event.isFavorite ? '★ В избранном' : '☆ В избранное'}
                </Button>
                <Link href={`/events/${event.id}`} passHref>
                    <Button variant="primary" size="small">Редактировать</Button>
                </Link>
                <Button variant="danger" onClick={onDelete} size="small">Удалить</Button>
            </div>
        </div>
    );
};

export default EventItem;
