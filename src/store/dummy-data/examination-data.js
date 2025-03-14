
export const examData = {
  examSchedule: [
    {
      id: 1,
      subject: "Mathematics",
      date: "2024-01-15",
      time: "09:00",
      duration: 120,
      room: "A101",
      examiner: "Dr. Smith"
    },
    {
      id: 2,
      subject: "Physics",
      date: "2024-01-16",
      time: "14:00",
      duration: 90,
      room: "B202",
      examiner: "Prof. Johnson"
    }
  ],

  gradeCalculator: {
    weightage: {
      assignments: 0.3,
      midterm: 0.3,
      final: 0.4
    },
    passingGrade: 60,
    gradeScale: {
      A: 90,
      B: 80,
      C: 70,
      D: 60,
      F: 0
    }
  },

  gradeEntry: [
    {
      studentId: "STD001",
      subject: "Mathematics",
      assignments: 85,
      midterm: 78,
      final: 92,
      totalScore: null,
      grade: null
    },
    {
      studentId: "STD002",
      subject: "Physics",
      assignments: 75,
      midterm: 82,
      final: 88,
      totalScore: null,
      grade: null
    }
  ],

  reportCard: {
    template: {
      header: {
        schoolName: "Academic Excellence Institute",
        academicYear: "2023-2024",
        semester: "Fall"
      },
      studentInfo: {
        required: ["name", "id", "class", "section"]
      },
      gradeTable: {
        columns: ["Subject", "Assignments", "Midterm", "Final", "Total", "Grade"]
      }
    }
  },

  examCalendar: {
    academicYear: "2023-2024",
    terms: [
      {
        name: "Fall Semester",
        startDate: "2023-09-01",
        endDate: "2023-12-20",
        examPeriods: [
          {
            type: "Midterm",
            startDate: "2023-10-15",
            endDate: "2023-10-25"
          },
          {
            type: "Final",
            startDate: "2023-12-10",
            endDate: "2023-12-20"
          }
        ]
      },
      {
        name: "Spring Semester",
        startDate: "2024-01-15",
        endDate: "2024-05-30",
        examPeriods: [
          {
            type: "Midterm",
            startDate: "2024-03-01",
            endDate: "2024-03-10"
          },
          {
            type: "Final",
            startDate: "2024-05-20",
            endDate: "2024-05-30"
          }
        ]
      }
    ]
  }
};
