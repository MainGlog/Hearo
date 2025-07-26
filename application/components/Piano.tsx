'use dom'
import {useEffect, useState} from "react";

export default function Piano(){
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [activeNotes, setActiveNotes] = useState<Set<String>>(new Set());
    const [activeOctaves, setActiveOctaves] = useState<number>(4);

    useEffect(() => {
        const context = new AudioContext();
        setAudioContext(context);

        return () => {
            context.close();
        }
    }, []);

    const playNote = (frequency: number) => {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, 0);

    }
}