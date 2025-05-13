using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class ChordController : Controller
    {
        private readonly ILogger<ChordController> _logger;
        private MUSICContext MUSICContext { get; init; }

        public ChordController(ILogger<ChordController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllChords")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Chord> GetChords()
        {
            return PeelChords(MUSICContext.Chords.ToList());
        }

        [HttpGet("GetChordById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Chord? GetChordById(int id)
        {
            return PeelChords(MUSICContext.Chords.ToList())
                .FirstOrDefault(c => c.ChordId == id);
        }

        [HttpPut("UpdateChord")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateChord(Chord updatedChord)
        {
            Chord? existingChord = MUSICContext.Chords
                .FirstOrDefault(c => c.ChordId == updatedChord.ChordId);
            if(existingChord == null)
            {
                return NotFound();
            }

            existingChord.ChordName = updatedChord.ChordName;
            existingChord.ChordQuality = updatedChord.ChordQuality;
            existingChord.ChordNotation = updatedChord.ChordNotation;
            existingChord.ChordRoot = updatedChord.ChordRoot;
            existingChord.Intervals = updatedChord.Intervals;
            MUSICContext.SaveChanges();
            
            return Ok(PeelChords(new List<Chord> { existingChord })[0]);
        }

        [HttpPost("CreateChord")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateChord([Required][FromBody] Chord newChord)
        {
            newChord.ChordId = MUSICContext.Chords.Max(c => c.ChordId) + 1;
            MUSICContext.Chords.Add(newChord);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetChordById), new { id = newChord.ChordId }, newChord);
        }

        [HttpDelete("DeleteChord")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteChord([Required][FromBody] Chord chordToDelete)
        {
            Chord? existingChord = MUSICContext.Chords
                .FirstOrDefault(c => c.ChordId == chordToDelete.ChordId);
            if (existingChord == null)
            {
                return NotFound();
            }
            MUSICContext.Chords.Remove(existingChord);
            MUSICContext.SaveChanges();
            return Ok();
        }

        private List<Chord> PeelChords(List<Chord> chords)
        {
            List<Chord> peeledChords = new List<Chord>();
            foreach (Chord c in chords)
            {
                peeledChords.Add(new Chord
                {
                    ChordId = c.ChordId,
                    ChordName = c.ChordName,
                    ChordQuality = c.ChordQuality,
                    ChordNotation = c.ChordNotation,
                    ChordRoot = c.ChordRoot
                });
            }
            return chords;
        }
    }
}
