using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotesAPI.Models
{
    public class NotesDbContext : DbContext
    {

        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }
    }
}
