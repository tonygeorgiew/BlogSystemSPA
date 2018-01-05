using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using BlogSystem.Api.Models;
using BlogSystem.Data;
using BlogSystem.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogSystem.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Posts")]
    public class PostsController : Controller
    {
        private readonly BlogSystemContext con;

        public PostsController(BlogSystemContext con)
        {
            this.con = con;
        } 

      
        public IEnumerable<Post> Get()
        {
            return con.Posts.ToList();
        }

        [HttpGet("{name}")]
        public IEnumerable<Post> Get(string name)
        {
            return con.Posts.Where(p => p.Author.ToLower() == name.ToLower()).ToList();
        }

        [HttpPost]
        public Post Post([FromBody] Post post)
        {
            con.Posts.Add(post);

            con.SaveChanges();

            return post;
        }
    }
}