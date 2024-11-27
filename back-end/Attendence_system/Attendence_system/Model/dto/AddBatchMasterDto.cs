using Microsoft.VisualBasic;

namespace Attendence_system.Model.dto
{
    public class AddBatchMasterDto
    {
        public string name { get; set; }

        public string trainer { get; set; }

        public DateTime startDate { get; set; }

        public DateTime endDate { get; set; }

        public string course { get; set; }
    }
}
