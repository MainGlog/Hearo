using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class ScaleController : Controller
    {
        private readonly ILogger<ScaleController> _logger;
        private MUSICContext MUSICContext { get; init; }

        public ScaleController(ILogger<ScaleController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllScales")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Scale> GetScales()
        {
            return MUSICContext.Scales.ToList();
        }

        [HttpGet("GetScaleById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Scale? GetScaleById(int id)
        {
            return MUSICContext.Scales
                .Select(s => new Scale
                {
                    ScaleId = s.ScaleId,
                    ScaleName = s.ScaleName,
                    ScaleQuality = s.ScaleQuality,
                    ScaleRoot = s.ScaleRoot,
                    KeyId = s.KeyId
                })
                .FirstOrDefault(s => s.ScaleId == id);
        }

        [HttpPut("UpdateScale")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateScale([Required][FromBody] Scale updatedScale)
        {
            Scale? existingScale = MUSICContext.Scales
                .FirstOrDefault(s => s.ScaleId == updatedScale.ScaleId);
            if (existingScale == null)
            {
                return NotFound();
            }
            existingScale.ScaleName = updatedScale.ScaleName;
            existingScale.ScaleQuality = updatedScale.ScaleQuality;
            existingScale.ScaleRoot = updatedScale.ScaleRoot;
            existingScale.Key = updatedScale.Key;

            MUSICContext.SaveChanges();
            return Ok(new List<Scale> { existingScale }[0]);
        }

        [HttpPost("CreateScale")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateScale([Required][FromBody] Scale newScale)
        {
            newScale.ScaleId = MUSICContext.Scales.Max(s => s.ScaleId) + 1;
            MUSICContext.Scales.Add(newScale);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetScaleById), new { id = newScale.ScaleId }, newScale);
        }

        [HttpDelete("DeleteScale")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteScale(int id)
        {
            Scale? existingScale = MUSICContext.Scales
                .FirstOrDefault(s => s.ScaleId == id);
            if (existingScale == null)
            {
                return NotFound();
            }
            MUSICContext.Scales.Remove(existingScale);
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
