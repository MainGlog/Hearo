using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class SoundController : Controller
    {
        private readonly ILogger<SoundController> _logger;
        private MUSICContext MUSICContext { get; init; }

        public SoundController(ILogger<SoundController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllSounds")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Sound> GetSounds()
        {
            return MUSICContext.Sounds.ToList();
        }

        [HttpGet("GetSoundsByNoteId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IEnumerable<Sound> GetSoundsByNoteId(int noteId)
        {
            return MUSICContext.Sounds
                .Where(s => s.NoteId == noteId)
                .ToList();
        }


        [HttpGet("GetSoundById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Sound? GetSoundById(int id)
        {
            return MUSICContext.Sounds
                .Select(s => new Sound
                {
                    SoundId = s.SoundId,
                    SoundFilePath = s.SoundFilePath,
                    SoundOctave = s.SoundOctave,
                    NoteId = s.NoteId,
                })
                .FirstOrDefault(s => s.SoundId == id);
        }

        [HttpPut("UpdateSound")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateSound([Required][FromBody] Sound updatedSound)
        {
            Sound? existingSound = MUSICContext.Sounds
                .FirstOrDefault(s => s.SoundId == updatedSound.SoundId);
            if (existingSound == null)
            {
                return NotFound();
            }
            existingSound.SoundFilePath = updatedSound.SoundFilePath;
            existingSound.SoundOctave = updatedSound.SoundOctave;
            existingSound.NoteId = updatedSound.NoteId;

            MUSICContext.SaveChanges();
            return Ok(new List<Sound> { existingSound }[0]);
        }

        [HttpPost("CreateSound")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateSound([Required][FromBody] Sound newSound)
        {
            newSound.SoundId = MUSICContext.Sounds.Max(s => s.SoundId) + 1;
            MUSICContext.Sounds.Add(newSound);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetSoundById), new { id = newSound.SoundId }, newSound);
        }

        [HttpDelete("DeleteSound")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteSound(int id)
        {
            Sound? existingSound = MUSICContext.Sounds
                .FirstOrDefault(s => s.SoundId == id);
            if (existingSound == null)
            {
                return NotFound();
            }
            MUSICContext.Sounds.Remove(existingSound);
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
