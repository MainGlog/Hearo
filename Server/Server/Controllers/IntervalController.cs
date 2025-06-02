using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class IntervalController : Controller
    {
        private readonly ILogger<IntervalController> _logger;
        private MUSICContext MusicContext { get; init; }
        public IntervalController(ILogger<IntervalController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MusicContext = musicContext;
        }

        [HttpGet("GetAllIntervals")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Interval> GetIntervals()
        {
            return MusicContext.Intervals.ToList();
        }

        [HttpGet("GetIntervalById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Interval? GetIntervalById(int id)
        {
            return MusicContext.Intervals
                .FirstOrDefault(i => i.IntervalId == id);
        }

        [HttpGet("GetIntervalsByScaleId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IEnumerable<Interval> GetIntervalsByScaleId(int scaleId)
        {
            // Returns the intervals from the ScaleNotes table
            List<ScaleNote> ScaleNotes = MusicContext.ScaleNotes
                .Where((s) => s.ScaleId == scaleId).ToList();

            List<Interval> Intervals = [];

            foreach (ScaleNote sn in ScaleNotes)
            {
                Intervals.Add(sn.Interval);
            }

            return Intervals;
        }

        [HttpPut("UpdateInterval")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateInterval(Interval updatedInterval)
        {
            Interval? existingInterval = MusicContext.Intervals
                .FirstOrDefault(i => i.IntervalId == updatedInterval.IntervalId);
            if (existingInterval == null)
            {
                return NotFound();
            }
            existingInterval.IntervalQuality = updatedInterval.IntervalQuality;
            existingInterval.IntervalSize = updatedInterval.IntervalSize;
            existingInterval.IntervalSemitonesFromRoot = updatedInterval.IntervalSemitonesFromRoot;
            existingInterval.IntervalNote = updatedInterval.IntervalNote;
            existingInterval.IntervalNoteId = updatedInterval.IntervalNoteId;
            existingInterval.RootNote = updatedInterval.RootNote;
            existingInterval.RootNoteId = updatedInterval.RootNoteId;
            
            MusicContext.SaveChanges();

            return Ok(new List<Interval> { existingInterval }[0]);
        }

        [HttpPost("CreateInterval")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateInterval([Required][FromBody] Interval newInterval)
        {
            newInterval.IntervalId = MusicContext.Intervals.Max(i => i.IntervalId) + 1;
            MusicContext.Intervals.Add(newInterval);
            MusicContext.SaveChanges();
            return CreatedAtAction(nameof(GetIntervalById), new { id = newInterval.IntervalId }, newInterval);
        }

        [HttpDelete("DeleteInterval")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteInterval([Required][FromBody] Interval existingInterval)
        {
            Interval? intervalToDelete = MusicContext.Intervals
                .FirstOrDefault(i => i.IntervalId == existingInterval.IntervalId);
            if (intervalToDelete == null)
            {
                return NotFound();
            }
            MusicContext.Intervals.Remove(intervalToDelete);
            MusicContext.SaveChanges();
            return Ok();
        }
    }
}
