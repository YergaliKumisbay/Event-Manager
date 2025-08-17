
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    size?: 'small' | 'medium';
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           type = 'button',
                                           onClick,
                                           size = 'medium',
                                       }) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]} ${styles[size]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
