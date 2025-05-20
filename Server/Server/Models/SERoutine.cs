using System.Text.Json.Serialization;

namespace Server.Models
{
    public class SERoutine
    {
        public int ScaleExerciseId { get; set; }
        public int RoutineId { get; set; }

        [JsonIgnore]
        public virtual ScaleExercise? ScaleExercise { get; set; }
        [JsonIgnore]
        public virtual Routine? Routine { get; set; }
    }
}
