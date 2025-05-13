using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class KeyController : Controller
    {
        private readonly ILogger<KeyController> _logger;
        private MUSICContext MUSICContext { get; init; }
        public KeyController(ILogger<KeyController> logger,
            MUSICContext musicContext)
        {
            _logger = logger;
            MUSICContext = musicContext;
        }

        [HttpGet("GetAllKeys")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<Key> GetKeys()
        {
            return MUSICContext.Keys.ToList();
        }

        [HttpGet("GetKeyById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Key? GetKeyById(int id)
        {
            return MUSICContext.Keys
                .FirstOrDefault(k => k.KeyId == id);
        }

        [HttpPut("UpdateKey")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateKey([Required][FromBody] Key updatedKey)
        {
            Key? existingKey = MUSICContext.Keys
                .FirstOrDefault(k => k.KeyId == updatedKey.KeyId);
            if (existingKey == null)
            {
                return NotFound();
            }

            existingKey.KeyName = updatedKey.KeyName;
            existingKey.KeySharpsCount = updatedKey.KeySharpsCount;
            existingKey.KeyFlatsCount = updatedKey.KeyFlatsCount;
            existingKey.KeyRelativeMajor = updatedKey.KeyRelativeMajor;
            existingKey.KeyRelativeMinor = updatedKey.KeyRelativeMinor;
            existingKey.KeyQuality = updatedKey.KeyQuality;
            existingKey.KeyDoubleFlatsCount = updatedKey.KeyDoubleFlatsCount;
            existingKey.KeyDoubleSharpsCount = updatedKey.KeyDoubleSharpsCount;
            existingKey.Scales = updatedKey.Scales;

            MUSICContext.SaveChanges();
            return Ok();
        }

        [HttpPost("CreateKey")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult CreateKey([Required][FromBody] Key newKey)
        {
            newKey.KeyId = MUSICContext.Keys.Max(k => k.KeyId) + 1;
            MUSICContext.Keys.Add(newKey);
            MUSICContext.SaveChanges();
            return CreatedAtAction(nameof(GetKeyById), new { id = newKey.KeyId }, newKey);
        }

        [HttpDelete("DeleteKey")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteKey([Required][FromBody] Key existingKey)
        {
            Key? keyToDelete = MUSICContext.Keys
                .FirstOrDefault(k => k.KeyId == existingKey.KeyId);
            if(keyToDelete == null)
            {
                return NotFound();
            }
            MUSICContext.Remove(existingKey);
            MUSICContext.SaveChanges();
            return Ok();
        }
    }
}
