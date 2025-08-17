
'use client';

import React, { useMemo, useState } from 'react';
import { Event } from '@/types/event';
import EventItem from './EventItem';
import styles from './EventList.module.css';
import Link from 'next/link';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import { useEvents } from '@/app/context/EventContext';

interface EventListProps {
    events: Event[];
    filter: { category?: string; status?: string };
    sort: { field: 'date' | 'title'; order: 'asc' | 'desc' };
    search: string;
    onToggleFavorite: (id: string) => void;
}

const PAGE_SIZE_OPTIONS = [6, 12, 24];

const EventList: React.FC<EventListProps> = ({ events, filter, sort, search, onToggleFavorite }) => {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const { dispatch } = useEvents();

    // Filter
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return events.filter(e => {
            const byCategory = filter.category ? e.category === filter.category : true;
            const byStatus = filter.status ? e.status === filter.status : true;
            const bySearch = q ? (e.title.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q)) : true;
            return byCategory && byStatus && bySearch;
        });
    }, [events, filter.category, filter.status, search]);

    // Sort
    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            if (sort.field === 'title') {
                return sort.order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else {
                const da = new Date(a.date).getTime();
                const db = new Date(b.date).getTime();
                return sort.order === 'asc' ? da - db : db - da;
            }
        });
    }, [filtered, sort.field, sort.order]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, currentPage, pageSize]);

    return (
        <div className="w-full">
            <div className={styles.header}>
                <h2>События</h2>
                <div className={styles.headerControls}>
                    <label className={styles.label}>Размер страницы</label>
                    <select
                        className={styles.select}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {PAGE_SIZE_OPTIONS.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <Link href="/events/new">
                        <Button variant="primary">Добавить событие</Button>
                    </Link>
                </div>
            </div>


            {sorted.length === 0 ? (
                <p className={styles.empty}>Ничего не найдено</p>
            )  : (
                <div className={styles.eventList}>
                    {paginated.map(event => (
                        <EventItem
                            key={event.id}
                            event={event}
                            onDelete={() => setDeleteId(event.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </div>
            )}

            {/* Пагинация */}
            {sorted.length > pageSize && (
                <div className={styles.pagination}>
                    <button
                        className={styles.pageBtn}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                    >
                        ← Назад
                    </button>

                    <div className={styles.pageInfo} aria-live="polite">
                        Стр. {currentPage} из {totalPages}
                    </div>

                    <button
                        className={styles.pageBtn}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Следующая страница"
                    >
                        Вперёд →
                    </button>
                </div>
            )}


            {deleteId && (
                <Modal
                    title="Подтверждение удаления"
                    onClose={() => setDeleteId(null)}
                    onConfirm={() => {
                        dispatch({ type: 'DELETE_EVENT', payload: deleteId! });
                        setDeleteId(null);
                    }}
                    confirmText="Удалить"
                    cancelText="Отмена"
                >
                    <p>Вы уверены, что хотите удалить это событие?</p>
                </Modal>
            )}
        </div>
    );
};

export default EventList;
