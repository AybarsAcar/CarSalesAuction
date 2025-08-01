import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import NavBar from "@/app/nav/NavBar";
import {ToasterProvider} from "@/app/providers/ToasterProvider";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        <ToasterProvider/>
        <NavBar/>
        <main className="container mx-auto px-5 pt-10">
            {children}
        </main>
        </body>
        </html>
    );
}
