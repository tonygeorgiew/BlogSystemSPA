using System;
using System.ComponentModel.DataAnnotations;

namespace BlogSystem.Data.Models.Base
{
   public class BaseModel
    {
        public BaseModel()
        {
            this.Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }
    }
}
