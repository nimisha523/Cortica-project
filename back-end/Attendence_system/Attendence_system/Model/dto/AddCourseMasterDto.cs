﻿namespace Attendence_system.Model.dto
{
    public class AddCourseMasterDto
    {
        public string name { get; set; }

        public string description { get; set; }

        public int fees { get; set; }

       // public List<BatchMasterDto> Batches { get; set; }  // Allow adding batches
    }
}