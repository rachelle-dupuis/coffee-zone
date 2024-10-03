import React from 'react';

export default async function AboutUsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex">
            <div className="flex-1 p-10">
                <h1 className="my-10 uppercase ">About us</h1>
                {children}
            </div>
        </div>
    );
}
