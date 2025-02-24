export const dummyCandidates = [
  {
    id: 1,
    civilStatus: {
      nom: 'Kamga',
      prenom: 'Jean',
      dateDeNaissance: '1995-05-15',
      lieuDeNaissance: 'Yaoundé',
      situationDeFamille: 'Célibataire',
      residenceHabituelle: 'Yaoundé',
      boitePostale: 'BP 1234',
      numeroDeTelephone: '+237 655123456',
      referencesFamilales: {
        nom_pere: 'Kamga Pierre',
        nom_mere: 'Tchinda Marie',
      },
      addressParents: 'Quartier Biyem-Assi, Yaoundé'
    },
    education: {
      diplomes: [
        {
          type: 'BACC',
          serie: 'D',
          annee: '2015',
          etablissement: 'Lycée de Biyem-Assi',
          mention: 'Bien'
        },
        {
          type: 'Licence',
          serie: 'Informatique',
          annee: '2018',
          etablissement: 'Université de Yaoundé I',
          mention: 'Assez Bien'
        }
      ],
      langues: {
        francais: 'Excellent',
        anglais: 'Bien'
      }
    },
    professional: {
      experiences: [
        {
          poste: 'Développeur Web Junior',
          entreprise: 'TechCam',
          periode: '2018-2020',
          description: 'Développement d\'applications web'
        }
      ]
    },
    extraActivities: {
      activites: [
        {
          type: 'Association',
          nom: 'Club Informatique',
          role: 'Président',
          periode: '2017-2018'
        }
      ],
      sports: ['Football', 'Basketball'],
      loisirs: ['Lecture', 'Musique']
    },
    diversInfo: {
      centreExamen: 'Yaoundé',
      optionChoisie: 'Journalisme',
      sourceInformation: 'Internet',
      motivation: 'Passion pour la communication et le journalisme'
    }
  },
  {
    id: 2,
    civilStatus: {
      nom: 'Nkomo',
      prenom: 'Sophie',
      dateDeNaissance: '1997-08-23',
      lieuDeNaissance: 'Douala',
      situationDeFamille: 'Célibataire',
      residenceHabituelle: 'Douala',
      boitePostale: 'BP 5678',
      numeroDeTelephone: '+237 699887766',
      referencesFamilales: {
        nom_pere: 'Nkomo Paul',
        nom_mere: 'Eyenga Rose',
      },
      addressParents: 'Quartier Bonamoussadi, Douala'
    },
    education: {
      diplomes: [
        {
          type: 'BACC',
          serie: 'A4',
          annee: '2016',
          etablissement: 'Lycée de Makepe',
          mention: 'Très Bien'
        },
        {
          type: 'Licence',
          serie: 'Communication',
          annee: '2019',
          etablissement: 'Université de Douala',
          mention: 'Bien'
        }
      ],
      langues: {
        francais: 'Excellent',
        anglais: 'Excellent'
      }
    },
    professional: {
      experiences: [
        {
          poste: 'Stagiaire en Communication',
          entreprise: 'CRTV',
          periode: '2019-2020',
          description: 'Assistant de production'
        }
      ]
    },
    extraActivities: {
      activites: [
        {
          type: 'Bénévolat',
          nom: 'ONG Éducation Pour Tous',
          role: 'Coordinatrice',
          periode: '2018-2019'
        }
      ],
      sports: ['Volleyball', 'Natation'],
      loisirs: ['Théâtre', 'Photographie']
    },
    diversInfo: {
      centreExamen: 'Douala',
      optionChoisie: 'Communication d\'Entreprise',
      sourceInformation: 'Ancien étudiant',
      motivation: 'Désir de contribuer au développement de la communication au Cameroun'
    }
  }
];
