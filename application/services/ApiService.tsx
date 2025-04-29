import axios from "axios";
import Exercise from "@/models/Exercise";
import Routine from "@/models/Routine";
import Chord from "@/models/Chord";
import Note from "@/models/Note";
import Scale from "@/models/Scale";
import Key from "@/models/Key";
import Interval from "@/models/Interval";
import Sound from "@/models/Sound";
import {useState} from "react";

const apiUrl = "http://localhost:7290"
export let keys: Key[];
export let notes: Note[];
export let chords: Chord[];
export let routines: Routine[];
export let exercises: Exercise[];
export let sounds: Sound[];
export let intervals: Interval[];
export default function App() {

}