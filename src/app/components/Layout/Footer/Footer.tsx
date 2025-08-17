import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 py-6 text-center text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <p>© {currentYear} Event Manager. All rights reserved.</p>
        </footer>
    );
};

export default Footer;