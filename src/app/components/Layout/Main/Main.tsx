import React, { ReactNode } from "react";

interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main className="flex-grow p-4 max-w-7xl mx-auto w-full">
            {children}
        </main>
    );
};

export default Main;