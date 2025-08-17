'use client';

import React from 'react';
import { EventFormData } from '@/types/event';
import styles from './EventForm.module.css';
import Button from '../UI/Button';

interface EventFormProps {
    initialData?: EventFormData;
    onSubmit: (formData: EventFormData) => void;
    onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState<EventFormData>(initialData || {
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        category: 'Конференция',
        status: 'Запланировано',
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Название обязательно';
        if (!formData.date) {
            newErrors.date = 'Дата обязательна';
        } else {
            const selected = new Date(formData.date).getTime();
            const now = Date.now() - 1000 * 60; // допускаем текущую минуту
            if (selected < now) newErrors.date = 'Дата не может быть в прошлом';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ ...formData, date: new Date(formData.date).toISOString() });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Название *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? styles.error : ''}
                />
                {errors.title && <p className={styles.errorText}>{errors.title}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date">Дата и время *</label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? styles.error : ''}
                />
                {errors.date && <p className={styles.errorText}>{errors.date}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Категория</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    <option value="Конференция">Конференция</option>
                    <option value="Вебинар">Вебинар</option>
                    <option value="Встреча">Встреча</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status">Статус</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="Запланировано">Запланировано</option>
                    <option value="Завершено">Завершено</option>
                </select>
            </div>

            <div className={styles.formActions}>
                <Button type="button" variant="secondary" onClick={onCancel}>Отмена</Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Обновить событие' : 'Создать событие'}
                </Button>
            </div>
        </form>
    );
};

export default EventForm;
