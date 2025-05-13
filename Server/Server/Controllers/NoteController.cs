using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class NoteController : Controller
    {
        private readonly ILogger<NoteController> _logger;
        private MUSICContext MUSICContext { get; init; }

        public NoteController(ILogger<NoteController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllNotes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        
        public IActionResult GetNotes()
        {
            List<Note> notes = MUSICContext.Notes
                .Include(n => n.Sounds)
                .Include(n => n.Enharmonics)
                .ToList();
            return Ok(notes);
        }

        [HttpGet("GetNoteById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Note? GetNoteById(int id)
        {
            return MUSICContext.Notes
                .FirstOrDefault(n => n.NoteId == id);
        }

        [HttpPut("UpdateNote")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateNote([Required][FromBody] Note updatedNote)
        {
            Note? existingNote = MUSICContext.Notes
                .FirstOrDefault(n => n.NoteId == updatedNote.NoteId);
            if (existingNote == null)
            {
                return NotFound();
            }
            existingNote.NoteName = updatedNote.NoteName;
            existingNote.Enharmonics = updatedNote.Enharmonics;
            existingNote.Sounds = updatedNote.Sounds;
            MUSICContext.SaveChanges();
            return Ok(new List<Note> { existingNote }[0]);
        }

        [HttpPost("CreateNote")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateNote([Required][FromBody] Note newNote)
        {
            newNote.NoteId = MUSICContext.Notes.Max(n => n.NoteId) + 1;
            MUSICContext.Notes.Add(newNote);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetNoteById), new { id = newNote.NoteId }, newNote);
        }

        [HttpDelete("DeleteNote")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteNote([Required][FromBody] Note existingNote)
        {
            Note? note = MUSICContext.Notes
                .FirstOrDefault(n => n.NoteId == existingNote.NoteId);
            if (note == null)
            {
                return NotFound();
            }
            MUSICContext.Notes.Remove(note);
            MUSICContext.SaveChanges();
            return Ok();
        }

        private List<Note> PeelNotes(List<Note> Notes)
        {
            List<Note> peeledNotes = new List<Note>();
            foreach (Note n in Notes)
            {
                peeledNotes.Add(new Note
                {
                    NoteId = n.NoteId,
                    NoteName = n.NoteName,
                });
            }
            return Notes;
        }
    }
}
