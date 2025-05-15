using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class ScaleExerciseController : ControllerBase 
    {
        private readonly ILogger<ScaleExerciseController> _logger;
        private MUSICContext MUSICContext { get; init; }
        public ScaleExerciseController(ILogger<ScaleExerciseController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllScaleExercises")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<ScaleExercise> GetScaleExercises()
        {
            return MUSICContext.ScaleExercises.ToList();
        }

        [HttpGet("GetScaleExerciseById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ScaleExercise?> GetScaleExerciseById(int id) 
        {
            ScaleExercise? scaleexercise = MUSICContext.ScaleExercises
                .FirstOrDefault(k => k.ScaleExerciseId == id);
            if (scaleexercise == null)
            {
                return NotFound();
            }
            return Ok(scaleexercise);
        }

        [HttpGet("GetRoutinesByScaleExerciseId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IEnumerable<Routine?> GetRoutinesByScaleExerciseId(int scaleExerciseId)
        {
            List<SERoutine> SERoutines = MUSICContext.SERoutines
                .Where((s) => s.ScaleExerciseId == scaleExerciseId).ToList();

            List<Routine> Routines = [];

            foreach (SERoutine ser in SERoutines)
            {
                Routines.Add(ser.Routine);
            }

            return Routines;
        }

        [HttpPut("UpdateScaleExercise")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateScaleExercise([Required][FromBody] ScaleExercise updatedScaleExercise)
        {
            ScaleExercise? existingScaleExercise = MUSICContext.ScaleExercises
                .FirstOrDefault(k => k.ScaleExerciseId == updatedScaleExercise.ScaleExerciseId);
            if (existingScaleExercise == null)
            {
                return NotFound();
            }

            existingScaleExercise.ListeningMode = updatedScaleExercise.ListeningMode;
            existingScaleExercise.TimePerNote = updatedScaleExercise.TimePerNote;
            existingScaleExercise.NumberOfNotes = updatedScaleExercise.NumberOfNotes;
            existingScaleExercise.NumberOfOctaves = updatedScaleExercise.NumberOfOctaves;
           
            MUSICContext.SaveChanges();
            return Ok();
        }

        [HttpPost("CreateScaleExercise")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateScaleExercise([Required][FromBody] ScaleExercise newScaleExercise)
        {
            newScaleExercise.ScaleExerciseId = MUSICContext.ScaleExercises.Max(k => k.ScaleExerciseId) + 1;
            MUSICContext.ScaleExercises.Add(newScaleExercise);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetScaleExerciseById), new { id = newScaleExercise.ScaleExerciseId }, newScaleExercise);
        }

        [HttpDelete("DeleteScaleExercise")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteScaleExercise([Required][FromBody] ScaleExercise existingScaleExercise)
        {
            ScaleExercise? scaleexerciseToDelete = MUSICContext.ScaleExercises
                .FirstOrDefault(k => k.ScaleExerciseId == existingScaleExercise.ScaleExerciseId);
            if (scaleexerciseToDelete == null)
            {
                return NotFound();
            }
            MUSICContext.Remove(scaleexerciseToDelete); 
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
