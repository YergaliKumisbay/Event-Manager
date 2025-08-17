
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
                                         title,
                                         children,
                                         onClose,
                                         onConfirm,
                                         confirmText = 'Confirm',
                                         cancelText = 'Cancel'
                                     }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <div className={styles.modalBody}>{children}</div>
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>{cancelText}</button>
                    <button className={styles.confirmButton} onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
