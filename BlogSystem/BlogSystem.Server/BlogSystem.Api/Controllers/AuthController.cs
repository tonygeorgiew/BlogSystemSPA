using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BlogSystem.Api.Models;
using BlogSystem.Data;
using BlogSystem.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BlogSystem.Api.Controllers
{
    public class JwtPacket
    {
        public string FirstName { get; set; }
        public string Token { get; set; }
    }



    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly BlogSystemContext context;

        public AuthController(BlogSystemContext context)
        {
            this.context = context;
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginData User)
        {
            var user = this.context.Users.SingleOrDefault(u => u.Email.ToLower() == User.Email.ToLower() &&
            u.Password.ToLower() == User.Password.ToLower());


            if (user == null)
                return NotFound("email or password is incorrect");

         

            return Ok(CreateJwtPacket(user));
        }


        [HttpPost("register")]
        public JwtPacket Register([FromBody] User User)
        {
            context.Users.Add(User);
            context.SaveChanges();


            return CreateJwtPacket(User);
       }

        public JwtPacket CreateJwtPacket(User user)
        {
            var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret key"));
            var signincredentials = new SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signincredentials);
            var encodedJwt = new JwtSecurityTokenHandler()
               .WriteToken(jwt);

            return new JwtPacket() { Token = encodedJwt, FirstName = user.FirstName };
        }
    }

    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}