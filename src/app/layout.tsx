import type { Metadata } from 'next';
import './globals.css';
import Header from '@/app/components/layout/Header/Header';
import Footer from '@/app/components/layout/Footer/Footer';
import Main from '@/app/components/layout/Main/Main';
import { EventProvider } from '@/app/context/EventContext';

export const metadata: Metadata = {
    title: 'Event Manager',
    description: 'Тестовое задание: Event Manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className="min-h-screen flex flex-col">
        <EventProvider>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </EventProvider>
        </body>
        </html>
    );
}
