using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class RoutineController : ControllerBase // Fix: Inherit from ControllerBase  
    {
        private readonly ILogger<RoutineController> _logger;
        private MUSICContext MUSICContext { get; init; }
        public RoutineController(ILogger<RoutineController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllRoutines")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Routine> GetRoutines()
        {
            return MUSICContext.Routines.ToList();
        }

        [HttpGet("GetRoutineById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Routine?> GetRoutineById(int id) // Fix: Use ActionResult<T>  
        {
            var routine = MUSICContext.Routines
                .FirstOrDefault(k => k.RoutineId == id);
            if (routine == null)
            {
                return NotFound();
            }
            return Ok(routine);
        }

        [HttpPut("UpdateRoutine")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateRoutine([Required][FromBody] Routine updatedRoutine)
        {
            Routine? existingRoutine = MUSICContext.Routines
                .FirstOrDefault(k => k.RoutineId == updatedRoutine.RoutineId);
            if (existingRoutine == null)
            {
                return NotFound();
            }

            existingRoutine.RoutineName = updatedRoutine.RoutineName;
            existingRoutine.RoutineExerciseCount = updatedRoutine.RoutineExerciseCount;
            existingRoutine.RoutineTimeToGuess = updatedRoutine.RoutineTimeToGuess;
            existingRoutine.RoutineDescription = updatedRoutine.RoutineDescription;

            MUSICContext.SaveChanges();
            return Ok();
        }

        [HttpPost("CreateRoutine")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateRoutine([Required][FromBody] Routine newRoutine)
        {
            newRoutine.RoutineName = String.IsNullOrEmpty(newRoutine.RoutineName)
            ? "New Routine"
            : newRoutine.RoutineName.Trim();

            newRoutine.RoutineDescription = String.IsNullOrEmpty(newRoutine.RoutineDescription)
                ? String.Empty
                : newRoutine.RoutineDescription.Trim();

            // Ensure non-null string properties to avoid null assignment issues
            newRoutine.RoutineName ??= string.Empty;
            newRoutine.RoutineDescription ??= string.Empty;

            MUSICContext.Routines.Add(newRoutine);
            MUSICContext.SaveChanges();

            return CreatedAtAction(nameof(GetRoutineById), new { id = newRoutine.RoutineId }, newRoutine);
        }

        [HttpDelete("DeleteRoutine")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteRoutine([Required][FromBody] Routine existingRoutine)
        {
            Routine? routineToDelete = MUSICContext.Routines
                .FirstOrDefault(k => k.RoutineId == existingRoutine.RoutineId);
            if (routineToDelete == null)
            {
                return NotFound();
            }
            MUSICContext.Remove(routineToDelete); // Fix: Use routineToDelete instead of existingRoutine  
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
