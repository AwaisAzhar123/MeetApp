using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeetApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage =" Password must be 4 to 8 characters long")]
        public string? Password { get; set; }
    }
}