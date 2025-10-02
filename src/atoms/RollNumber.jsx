import React, { useEffect, useState } from "react";

export default function RollAnimation({ value, duration = 1500 }) {
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        if (value === null || value === undefined) return;

        let count = 0;
        const interval = setInterval(() => {
            setDisplay(Math.floor(Math.random() * 32));
            count++;
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplay(value);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [value, duration]);

    return (
        <h1
            style={{
                fontSize: "4rem",
                transition: "transform 0.2s",
                transform: display === value ? "scale(1.3)" : "scale(1)",
            }}
        >
            {display ?? "ERROR"}
        </h1>
    );
}
