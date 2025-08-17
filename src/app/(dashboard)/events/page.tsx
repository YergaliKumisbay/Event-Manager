'use client';

import { useMemo, useState } from 'react';
import { useEvents } from '@/app/context/EventContext';
import EventList from '@/app/components/EventList/EventList';
import { exportToJson } from '@/lib/utils';
import styles from './EventsPage.module.css';

export default function EventsPage() {
    const { state, dispatch } = useEvents();

    const [filter, setFilter] = useState<{ category?: string; status?: string }>({});
    const [sort, setSort] = useState<{ field: 'date' | 'title'; order: 'asc' | 'desc' }>({
        field: 'date',
        order: 'asc',
    });
    const [search, setSearch] = useState('');

    const handleToggleFavorite = (id: string) => dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    const handleExport = () => exportToJson(state.events, 'events.json');

    const stats = useMemo(() => {
        const total = state.events.length;
        const planned = state.events.filter(e => e.status === 'Запланировано').length;
        const completed = total - planned;
        const favorites = state.events.filter(e => e.isFavorite).length;
        return { total, planned, completed, favorites };
    }, [state.events]);

    if (state.loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading events...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header + KPI */}
            <div className={styles.topbar}>
                <div className={styles.topbarTitle}>
                    <h1 className={styles.pageTitle}>Event Manager</h1>
                    <p className={styles.pageSub}>Просматривайте, фильтруйте и управляйте событиями</p>
                </div>

                <div className={styles.kpiGrid}>
                    <div className={styles.kpiCard}>
                        <span className={styles.kpiLabel}>Всего</span>
                        <span className={styles.kpiValue}>{stats.total}</span>
                    </div>
                    <div className={styles.kpiCard}>
                        <span className={styles.kpiLabel}>Запланировано</span>
                        <span className={styles.kpiValue}>{stats.planned}</span>
                    </div>
                    <div className={styles.kpiCard}>
                        <span className={styles.kpiLabel}>Завершено</span>
                        <span className={styles.kpiValue}>{stats.completed}</span>
                    </div>
                    <div className={styles.kpiCard}>
                        <span className={styles.kpiLabel}>Избранное</span>
                        <span className={styles.kpiValue}>{stats.favorites}</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                        aria-label="Поиск событий"
                    />
                </div>

                <div className={styles.controlsGrid}>
                    <div className={styles.chipsRow} role="group" aria-label="Фильтр по категории">
                        {['', 'Конференция', 'Вебинар', 'Встреча'].map((c) => (
                            <button
                                key={c || 'all'}
                                className={`${styles.chip} ${(!filter.category && c === '') || filter.category === c ? styles.chipActive : ''}`}
                                onClick={() => setFilter(prev => ({ ...prev, category: c || undefined }))}
                            >
                                {c || 'Все категории'}
                            </button>
                        ))}
                    </div>

                    <div className={styles.chipsRow} role="group" aria-label="Фильтр по статусу">
                        {['', 'Запланировано', 'Завершено'].map((s) => (
                            <button
                                key={s || 'all-status'}
                                className={`${styles.chip} ${(!filter.status && s === '') || filter.status === s ? styles.chipActive : ''}`}
                                onClick={() => setFilter(prev => ({ ...prev, status: s || undefined }))}
                            >
                                {s || 'Любой статус'}
                            </button>
                        ))}
                    </div>

                    <div className={styles.sortRow}>
                        <label className={styles.sortLabel}>Сортировка</label>
                        <div className={styles.sortControls}>
                            <select
                                value={sort.field}
                                onChange={(e) => setSort({ ...sort, field: e.target.value as 'date' | 'title' })}
                                className={styles.select}
                                aria-label="Поле сортировки"
                            >
                                <option value="date">По дате</option>
                                <option value="title">По названию</option>
                            </select>
                            <select
                                value={sort.order}
                                onChange={(e) => setSort({ ...sort, order: e.target.value as 'asc' | 'desc' })}
                                className={styles.select}
                                aria-label="Порядок сортировки"
                            >
                                <option value="asc">По возрастанию</option>
                                <option value="desc">По убыванию</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.actionsRow}>
                        <button className={styles.exportButton} onClick={handleExport} aria-label="Экспортировать в JSON">
                            <span className={styles.iconDownload} aria-hidden>↓</span>
                            Экспорт JSON
                        </button>
                    </div>
                </div>
            </div>

            {/* Список */}
            <EventList
                events={state.events}
                filter={filter}
                sort={sort}
                search={search}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
}
