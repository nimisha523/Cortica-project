namespace Attendence_system.Model.Domain
{
    public class Course_Master
    {
        public Guid id { get; set; }
        public string name { get; set; }

        public string description { get; set; }

        public int fees { get; set; }


        // Navigation property for one-to-many relationship
       // public ICollection<Batch_Master> batches { get; set; }
    }
}
