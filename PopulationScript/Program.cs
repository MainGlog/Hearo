using PopulationScript.Models;

namespace PopulationScript
{
    public static class Program
    {
        static MUSICContext.MUSICContext Database = new MUSICContext.MUSICContext();
        enum intervalQualities
        {
            Major,
            Minor,
            Augmented,
            Diminished,
            Perfect
        }
        static List<String> noteNames =
        [
            "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"
        ];
        static List<String> noteEnharmonics =
        [
            null, "A#", "Cb", "B#", "C#", null, "D#", "Fb", null, "F#", null, "G#"
        ];

        static void Main(string[] args)
        {
            
            var Notes = GetNotes();

            AddNotesToDb();

            AddChordsToDb();
            

            
        }

        public static void AddNotesToDb()
        {
            for (int i = 0; i < noteNames.Count; i++)
            {
                Database.Add(
                new Note 
                {
                    NoteId = i, 
                    NoteName = noteNames[i], 
                    NoteEnharmonic = noteEnharmonics[i]
                });
            }
            Database.SaveChanges();
        }

        public static void AddChordsToDb()
        {
            List<Note> Notes = GetNotes().ToList();


            int intervalCount = 0;

            for (int i = 0; i < Notes.Count; i++)
            {
                /*
                 * ==========================================
                 *              Major Chords
                 * ==========================================
                 */

                Chord majorChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Major.ToString(),
                    ChordName = $"{Notes[i].NoteName} Major",
                    ChordNotation = $"{Notes[i].NoteName}M"
                };

                // Third Interval

                int ThirdSemitones = 4;
                if (i + ThirdSemitones >= Notes.Count) 
                {
                    ThirdSemitones = -8;
                }
                majorChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });

                // Fifth Interval

                int FifthSemitones = 7;
                if (i + FifthSemitones >= Notes.Count)
                {
                    FifthSemitones = -5;
                }
                majorChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Perfect.ToString(),
                    IntervalSize = 5,
                    IntervalSemitonesFromRoot = FifthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + FifthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(majorChord);

                /*
                 * ==========================================
                 *              Minor Chords
                 * ==========================================
                 */

                Chord minorChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Major.ToString(),
                    ChordName = $"{Notes[i].NoteName} Minor",
                    ChordNotation = $"{Notes[i].NoteName}m"
                };

                // Third Interval

                ThirdSemitones = 3;
                if (i + ThirdSemitones >= Notes.Count)
                {
                    ThirdSemitones = -9;
                }
                minorChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Minor.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });


                // Fifth Interval

                FifthSemitones = 7;
                if (i + FifthSemitones >= Notes.Count)
                {
                    FifthSemitones = -5;
                }
                minorChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Perfect.ToString(),
                    IntervalSize = 5,
                    IntervalSemitonesFromRoot = FifthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + FifthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(minorChord);


                /*
                 * ==========================================
                 *              Diminished Chords
                 * ==========================================
                 */

                Chord diminishedChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Diminished.ToString(),
                    ChordName = $"{Notes[i].NoteName} Diminished",
                    ChordNotation = $"{Notes[i].NoteName}o"
                };

                // Third Interval

                ThirdSemitones = 3;
                if (i + ThirdSemitones >= Notes.Count)
                {
                    ThirdSemitones = -9;
                }
                diminishedChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Minor.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });


                // Fifth Interval
                ThirdSemitones = 6;
                if (i + FifthSemitones >= Notes.Count)
                {
                    FifthSemitones = -6;
                }
                diminishedChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Diminished.ToString(),
                    IntervalSize = 5,
                    IntervalSemitonesFromRoot = FifthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + FifthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(diminishedChord);

                /*
                 * ========================================== 
                 *              Augmented Chords
                 * ==========================================
                 */



                Chord augmentedChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Augmented.ToString(),
                    ChordName = $"{Notes[i].NoteName} Augmented",
                    ChordNotation = $"{Notes[i].NoteName}+"
                };

                // Third Interval

                ThirdSemitones = 4;
                if (i + ThirdSemitones >= Notes.Count)
                {
                    ThirdSemitones = -8;
                }
                augmentedChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });


                // Fifth Interval

                FifthSemitones = 8;
                if (i + FifthSemitones >= Notes.Count)
                {
                    FifthSemitones = -4;
                }

                augmentedChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Augmented.ToString(),
                    IntervalSize = 5,
                    IntervalSemitonesFromRoot = FifthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + FifthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(augmentedChord);

                /*
                 * ==========================================
                 *              Major Sixth Chords
                 * ==========================================
                */


                Chord sixthChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Major.ToString(),
                    ChordName = $"{Notes[i].NoteName} Major Sixth",
                    ChordNotation = $"{Notes[i].NoteName} 6"
                };

                // Third Interval

                ThirdSemitones = 4;
                if (i + ThirdSemitones >= Notes.Count)
                {
                    ThirdSemitones = -8;
                }
                sixthChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });


                // Sixth Interval

                int SixthSemitones = 9;
                if (i + SixthSemitones >= Notes.Count)
                {
                    SixthSemitones = -3;
                }
                sixthChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 6,
                    IntervalSemitonesFromRoot = SixthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + SixthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(sixthChord);


                /*
                * ==========================================
                *               Six Nine Chords
                * ==========================================
                */

                Chord sixNineChord = new Chord
                {
                    ChordId = i,
                    ChordRoot = Notes[i].NoteName,
                    ChordQuality = intervalQualities.Major.ToString(),
                    ChordName = $"{Notes[i].NoteName} Major",
                    ChordNotation = $"{Notes[i].NoteName}M"
                };

                // Third Interval

                ThirdSemitones = 4;
                if (i + ThirdSemitones >= Notes.Count)
                {
                    ThirdSemitones = -8;
                }
                sixNineChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 3,
                    IntervalSemitonesFromRoot = ThirdSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + ThirdSemitones) % Notes.Count].NoteId,
                });

                // Sixth Interval

                SixthSemitones = 9;
                if (i + SixthSemitones >= Notes.Count)
                {
                    SixthSemitones = -3;
                }
                sixNineChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 6,
                    IntervalSemitonesFromRoot = SixthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + SixthSemitones) % Notes.Count].NoteId,
                });

                // Ninth Interval

                int NinthSemitones = 14;
                if (i + NinthSemitones >= Notes.Count)
                {
                    NinthSemitones = 2;
                }
                sixNineChord.Intervals.Add(new Interval
                {
                    IntervalId = intervalCount++,
                    IntervalQuality = intervalQualities.Major.ToString(),
                    IntervalSize = 9,
                    IntervalSemitonesFromRoot = NinthSemitones,
                    RootNoteId = Notes[i].NoteId,
                    IntervalNoteId = Notes[(Notes[i].NoteId + NinthSemitones) % Notes.Count].NoteId,
                });

                Database.Add(sixNineChord);

                /*
                 * ==========================================
                 *          Diminished 7th Chords
                 * ==========================================
                 */
                



            }
            // Db.SaveChanges();
        }

        public static void AddKeysToDb()
        {
            // Major Keys
            
            int Id = 0;
            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "A",
                KeySharpsCount = 3,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "F#"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Bb",
                KeyFlatsCount = 2,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "G"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "B",
                KeySharpsCount = 5,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "G#"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "C",
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "A"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Db",
                KeyFlatsCount = 5,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "Bb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "C#",
                KeySharpsCount = 7,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "A#"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "D",
                KeySharpsCount = 2,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "B"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Eb",
                KeyFlatsCount = 3,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "C"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "E",
                KeySharpsCount = 4,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "C#"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "F",
                KeyFlatsCount = 1,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "D"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "F#",
                KeySharpsCount = 6,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "D#"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Gb",
                KeyFlatsCount = 6,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "Eb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "G",
                KeySharpsCount = 1,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "E"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Ab",
                KeyFlatsCount = 4,
                KeyQuality = intervalQualities.Major.ToString(),
                KeyRelativeMinor = "F"
            });

            // Minor Keys

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "A",
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "C"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Bb",
                KeyFlatsCount = 5,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Db"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "B",
                KeySharpsCount = 2,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "D"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "C",
                KeyFlatsCount = 3,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Eb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "C#",
                KeySharpsCount = 4,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "E"
            }); 

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "D",
                KeyFlatsCount = 1,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "F"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Eb",
                KeyFlatsCount = 6,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Gb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "E",
                KeySharpsCount = 1,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "G"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "F",
                KeyFlatsCount = 4,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Ab"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "F#",
                KeySharpsCount = 3,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "A"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "G",
                KeyFlatsCount = 2,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Bb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "Ab",
                KeyFlatsCount = 7,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "Cb"
            });

            Database.Keys.Add(new Key
            {
                KeyId = Id++,
                KeyName = "G#",
                KeySharpsCount = 5,
                KeyQuality = intervalQualities.Minor.ToString(),
                KeyRelativeMajor = "B"
            });

            foreach(Key key in Database.Keys)
            {
                Console.WriteLine(key);
            }

            Database.SaveChanges();
        }

        public static void AddScalesToDb()
        {
            List<Key> Keys = GetKeys().ToList();
            int Id = 0;

            // Major Scales
            {
                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "A Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot = "A",
                    KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Bb Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "Bb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "B Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "B",
                    KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "C",
                    KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Db Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "Db",
                    KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C# Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "C#",
                    KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "D Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "D",
                    KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Eb Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "Eb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "E Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "E",
                    KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "F",
                    KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F# Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "F#",
                    KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Gb Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "Gb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "G",
                    KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Ab Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "Ab",
                    KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G# Major",
                    ScaleQuality = intervalQualities.Major.ToString(),
                    ScaleRoot= "G#",
                    KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                });
            }
            // Minor Scales
            {
                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "A Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "A",
                    KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Bb Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Bb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "B Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "B",
                    KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C",
                    KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C# Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C#",
                    KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "D Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "D",
                    KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Eb Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Eb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "E Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "E",
                    KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F",
                    KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F# Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F#",
                    KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G",
                    KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Ab Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Ab",
                    KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G# Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G#",
                    KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });
            }
            // Harmonic Minor
            {
                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "A Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "A",
                    KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Bb Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Bb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "B Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "B",
                    KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C",
                    KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C# Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C#",
                    KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "D Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "D",
                    KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Eb Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Eb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "E Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "E",
                    KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F",
                    KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F# Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F#",
                    KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G",
                    KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Ab Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Ab",
                    KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G# Harmonic Minor",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G#",
                    KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });
            }
            // Melodic Minor (Ascending)
            {
                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "A Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "A",
                    KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Bb Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Bb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "B Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "B",
                    KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C",
                    KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C# Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C#",
                    KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "D Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "D",
                    KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Eb Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Eb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "E Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "E",
                    KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F",
                    KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F# Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F#",
                    KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G",
                    KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Ab Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Ab",
                    KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G# Melodic Minor (Ascending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G#",
                    KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });
            }
            // Melodic Minor (Descending)
            {
                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "A Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "A",
                    KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Bb Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Bb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "B Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "B",
                    KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C",
                    KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "C# Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "C#",
                    KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "D Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "D",
                    KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Eb Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Eb",
                    KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "E Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "E",
                    KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F",
                    KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "F# Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "F#",
                    KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G",
                    KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "Ab Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "Ab",
                    KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });

                Database.Scales.Add(new Scale
                {
                    ScaleId = Id++,
                    ScaleName = "G# Melodic Minor (Descending)",
                    ScaleQuality = intervalQualities.Minor.ToString(),
                    ScaleRoot= "G#",
                    KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Minor.ToString())).KeyId
                });
            }

            // Modes

            // Major
            {
                // Dorian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Eb Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Eb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D# Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G# Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G#",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Ab Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Ab",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Bb Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Bb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A# Dorian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }

                // Phrygian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D#",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G#",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A#",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Bb Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Bb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B# Phrygian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }

                // Lydian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Eb Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Eb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Gb Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Gb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Ab Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Ab",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Bb Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Bb",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Cb Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Cb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Db Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Db",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Lydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }

                // Mixolydian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Ab Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Ab",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G# Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Bb Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Bb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Db Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Db",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Eb Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Eb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D# Mixolydian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }

                // Aeolian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G#",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Bb Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Bb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D#",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Eb Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Eb",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E# Aeolian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }

                // Locrian
                {
                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G#",
                        KeyId = Keys.First(k => k.KeyName.Equals("A") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A",
                        KeyId = Keys.First(k => k.KeyName.Equals("Bb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "A# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "A#",
                        KeyId = Keys.First(k => k.KeyName.Equals("B") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B",
                        KeyId = Keys.First(k => k.KeyName.Equals("C") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C",
                        KeyId = Keys.First(k => k.KeyName.Equals("Db") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "B# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "B#",
                        KeyId = Keys.First(k => k.KeyName.Equals("C#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "C# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "C#",
                        KeyId = Keys.First(k => k.KeyName.Equals("D") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D",
                        KeyId = Keys.First(k => k.KeyName.Equals("Eb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "D# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "D#",
                        KeyId = Keys.First(k => k.KeyName.Equals("E") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "Eb Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "Eb",
                        KeyId = Keys.First(k => k.KeyName.Equals("F") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "E# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "E#",
                        KeyId = Keys.First(k => k.KeyName.Equals("F#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F",
                        KeyId = Keys.First(k => k.KeyName.Equals("Gb") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F# Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F#",
                        KeyId = Keys.First(k => k.KeyName.Equals("G") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "G Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "G",
                        KeyId = Keys.First(k => k.KeyName.Equals("Ab") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });

                    Database.Scales.Add(new Scale
                    {
                        ScaleId = Id++,
                        ScaleName = "F## Locrian",
                        ScaleQuality = intervalQualities.Major.ToString(),
                        ScaleRoot= "F##",
                        KeyId = Keys.First(k => k.KeyName.Equals("G#") && k.KeyQuality.Equals(intervalQualities.Major.ToString())).KeyId
                    });
                }
            }

        }

        public static IEnumerable<Key> GetKeys()
        {
            return Database.Keys;
        }

        public static IEnumerable<Note> GetNotes()
        {
            return Database.Notes;
        }

        public static IEnumerable<Chord> GetChords()
        {
            return Database.Chords;
        }
    }
}

