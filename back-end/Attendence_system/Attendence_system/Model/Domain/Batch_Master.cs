using Microsoft.VisualBasic;

namespace Attendence_system.Model.Domain
{
    public class Batch_Master
    {
        public Guid id { get; set; }
        public string name { get; set; }

        public string trainer { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public string course { get; set; }

        // Foreign key for Course_Master
       // public Guid CourseId { get; set; }

        // Navigation property for the related Course_Master
       // public Course_Master Course { get; set; }
    }
}
