﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Server.Models;

public partial class Chord
{
    public int ChordId { get; set; }

    public string ChordName { get; set; } = null!;

    public string ChordQuality { get; set; } = null!;

    public string? ChordRoot { get; set; }

    public string? ChordNotation { get; set; }
    [JsonIgnore]
    public virtual ICollection<Interval> Intervals { get; set; } = new List<Interval>();
}