using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class SERoutineController : ControllerBase
    {
        private readonly ILogger<SERoutineController> _logger;
        private MUSICContext MUSICContext { get; init; }
        public SERoutineController(ILogger<SERoutineController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllSERoutines")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<SERoutine> GetSERoutines()
        {
            return MUSICContext.SERoutines.ToList();
        }

        [HttpGet("GetSERoutinesByRoutineId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<SERoutine?> GetSERoutinesByRoutineId(int routineId) 
        {
            List<SERoutine> seroutines = MUSICContext.SERoutines
                .Where(k => k.RoutineId == routineId).ToList();
            if (seroutines == null)
            {
                return NotFound();
            }
            return Ok(seroutines);
        }

        [HttpPut("UpdateSERoutine")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateSERoutine([Required][FromBody] SERoutine updatedSERoutine)
        {
            SERoutine? existingSERoutine = MUSICContext.SERoutines
                .FirstOrDefault(k => k.RoutineId == updatedSERoutine.RoutineId);
            if (existingSERoutine == null)
            {
                return NotFound();
            }

            existingSERoutine.ScaleExerciseId = updatedSERoutine.ScaleExerciseId;
            existingSERoutine.RoutineId = updatedSERoutine.RoutineId;

            MUSICContext.SaveChanges();
            return Ok();
        }

        [HttpPost("CreateSERoutine")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CreateSERoutine([Required][FromBody] SERoutine newSERoutine)
        {
            Routine routine = MUSICContext.Routines.Find(newSERoutine.RoutineId)!;
            ScaleExercise scaleExercise = MUSICContext.ScaleExercises.Find(newSERoutine.ScaleExerciseId)!;

            // Verify that references exist
            if (routine == null || scaleExercise == null)
            {
                return NotFound("Referenced Routine or ScaleExercise do not exist");
            }
            
            // Check for duplicate entries
            if (MUSICContext.SERoutines.Any(s =>
                s.RoutineId == newSERoutine.RoutineId &&
                s.ScaleExerciseId == newSERoutine.ScaleExerciseId
            ))
            {
                return BadRequest("This Scale Exercise is already in the Routine");
            }

            MUSICContext.SERoutines.Add(newSERoutine);
            MUSICContext.SaveChanges();
            
            return CreatedAtAction(
                nameof(GetSERoutinesByRoutineId),
                // This segment allows the location header to be properly generated
                // for getting an SERoutine by Routine id 
                new { routineId = newSERoutine.RoutineId}, 
                newSERoutine);
        }

        [HttpDelete("DeleteSERoutine")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteSERoutine([Required][FromBody] SERoutine existingSERoutine)
        {
            SERoutine? seroutineToDelete = MUSICContext.SERoutines
                .FirstOrDefault(k => k.RoutineId == existingSERoutine.RoutineId && k.ScaleExerciseId == existingSERoutine.ScaleExerciseId);
            if (seroutineToDelete == null)
            {
                return NotFound();
            }
            MUSICContext.Remove(seroutineToDelete); 
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
