import React, { useState, useEffect } from 'react';
import './AILoader.css';

const MESSAGES = [
    "Consulting the digital oracles...",
    "Teaching the AI the difference between a cat and a croissant...",
    "Consulting with the digital oracles...",
    "AI is thinking... hope it's not planning world domination.",
    "Gathering pixelated wisdom...",
    "Downloading 1000 years of trivia in 5 seconds...",
    "Bribing the AI with virtual cookies...",
    "Searching the internet for the answer to life...",
    "Mixing 0s and 1s into a delicious quiz...",
    "Training the AI to be smarter than a 5th grader...",
    "Almost there! The AI is double-checking its facts...",
    "Optimizing brain sub-routines...",
];

export default function AILoader() {
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx(prev => (prev + 1) % MESSAGES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="ai-loader-overlay">
            <div className="ai-loader-content">
                <div className="qp-loader-ring" />
                <div className="ai-loader-text">
                    <h3 className="ai-loader-title">AI is Crafting Your Quiz</h3>
                    <p className="ai-loader-msg">{MESSAGES[msgIdx]}</p>
                </div>
            </div>
        </div>
    );
}
