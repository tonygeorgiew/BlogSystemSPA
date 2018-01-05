using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BlogSystem.Data;
using BlogSystem.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BlogSystem.Api.Controllers
{
    public class EditProfileData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }




    [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly BlogSystemContext context;

        public UsersController(BlogSystemContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult Get()
        {
            return Ok(GetSecureUser());
        }

        [Authorize]
        [HttpPost("me")]
        public ActionResult Post([FromBody] EditProfileData profileData)
        {
            var user = GetSecureUser();
            user.FirstName = profileData.FirstName ?? user.FirstName;
            user.LastName = profileData.LastName ?? user.LastName;
            context.SaveChanges();
            return Ok(user);
        }

        public User GetSecureUser()
        {
            var id = HttpContext.User.Claims.First().Value;
            return context.Users.Single(u => u.Id == id);
        }

        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            var user = context.Users.SingleOrDefault(u => u.Id.ToLower() == id);

            if (user == null)
                return NotFound("user not found");

            return Ok(CreateJwtPacket(user));
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
}