export const mockReportTemplates = {
  studentReport: {
    header: {
      schoolName: "ESSTIC - École Supérieure des Sciences et Technologies de l'Information et de la Communication",
      academicYear: "2023-2024",
      semester: "Semestre 1",
      reportType: "Relevé de Notes"
    },
    students: [
      {
        studentInfo: {
          firstName: "John",
          lastName: "Doe",
          dateOfBirth: "1999-01-01",
          placeOfBirth: "Yaoundé",
          nationality: "Camerounaise",
          studentId: "STD001",
          class: "Niveau 1",
          section: "Communication"
        },
        grades: {
          INF101: {
            subjectName: "Introduction à l'Informatique",
            cc: 15.5,
            tp: 17.0,
            exam: 14.5,
            final: 15.4,
            credits: 4,
            mention: "Bien"
          },
          COM201: {
            subjectName: "Communication et Médias",
            cc: 16.0,
            tp: 15.5,
            exam: 14.0,
            final: 15.0,
            credits: 3,
            mention: "Bien"
          },
          JRN301: {
            subjectName: "Journalisme Digital",
            cc: 13.5,
            tp: 16.0,
            exam: 15.0,
            final: 14.9,
            credits: 5,
            mention: "Assez Bien"
          },
          PRD401: {
            subjectName: "Production Audiovisuelle",
            cc: 14.0,
            tp: 17.5,
            exam: 15.5,
            final: 16.0,
            credits: 6,
            mention: "Bien"
          }
        },
        summary: {
          totalCredits: 18,
          averageGrade: 15.325,
          globalMention: "Bien",
          rank: "1er/25"
        }
      },
      {
        studentInfo: {
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "1998-06-15",
          placeOfBirth: "Douala",
          nationality: "Camerounaise",
          studentId: "STD002",
          class: "Niveau 1",
          section: "Communication"
        },
        grades: {
          INF101: {
            subjectName: "Introduction à l'Informatique",
            cc: 14.0,
            tp: 15.5,
            exam: 13.5,
            final: 14.2,
            credits: 4,
            mention: "Assez Bien"
          },
          COM201: {
            subjectName: "Communication et Médias",
            cc: 17.0,
            tp: 16.5,
            exam: 15.0,
            final: 16.0,
            credits: 3,
            mention: "Bien"
          },
          JRN301: {
            subjectName: "Journalisme Digital",
            cc: 15.5,
            tp: 16.0,
            exam: 14.5,
            final: 15.3,
            credits: 5,
            mention: "Bien"
          },
          PRD401: {
            subjectName: "Production Audiovisuelle",
            cc: 16.0,
            tp: 15.5,
            exam: 14.0,
            final: 15.1,
            credits: 6,
            mention: "Bien"
          }
        },
        summary: {
          totalCredits: 18,
          averageGrade: 15.15,
          globalMention: "Bien",
          rank: "2e/25"
        }
      }
    ],
    footer: {
      date: "31/01/2024",
      signatures: {
        director: "Directeur des Études",
        dean: "Doyen de la Faculté",
        examBoard: "Président du Jury"
      },
      stamp: "ESSTIC_OFFICIAL_STAMP",
      notes: [
        "CC: Contrôle Continu",
        "TP: Travaux Pratiques",
        "EX: Examen Final",
        "Mentions: Très Bien (16-20), Bien (14-15.99), Assez Bien (12-13.99), Passable (10-11.99)"
      ]
    }
  }
};