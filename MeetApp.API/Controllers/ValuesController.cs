using MeetApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MeetApp.API.Controllers;
[Authorize]
[ApiController]
[Route("[controller]")]
public class ValuesController : ControllerBase
{
    private readonly DataContext _context;
    public ValuesController(DataContext context)
    {
        _context=context;
    }
    [Authorize]
    [HttpGet(Name = "GetValues")]
    public async Task<IActionResult> GetValues()
    {
        var values = await _context.Values?.ToListAsync();
        return Ok(values);
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
        var value = await _context.Values?.FirstOrDefaultAsync( x => x.Id == id);
        return Ok(value);
    }
}
 