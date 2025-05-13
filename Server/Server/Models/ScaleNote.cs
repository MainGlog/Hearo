namespace Server.Models
{
    public class ScaleNote
    {
        public int ScaleId { get; set; }
        public int IntervalId { get; set; }

        public virtual Interval Interval { get; set; } = null!;
        public virtual Scale Scale { get; set; } = null!;
    }
}
