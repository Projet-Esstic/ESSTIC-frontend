
export const mockExamTypes = {
  cc: {
    id: 'cc',
    name: 'Contrôle Continu',
    shortName: 'CC',
    weight: 0.3,
    description: 'Évaluation continue tout au long du semestre'
  },
  tp: {
    id: 'tp',
    name: 'Travaux Pratiques',
    shortName: 'TP',
    weight: 0.3,
    description: 'Évaluation des travaux pratiques et applications'
  },
  exam: {
    id: 'exam',
    name: 'Examen Final',
    shortName: 'EX',
    weight: 0.4,
    description: 'Évaluation finale du semestre'
  }
};

export const getExamTypeInfo = (typeId) => {
  return mockExamTypes[typeId] || null;
};

export const getExamTypeWeight = (typeId) => {
  return mockExamTypes[typeId]?.weight || 0;
};
