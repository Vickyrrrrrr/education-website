import { create } from 'zustand';

export const useClassStore = create((set) => ({
  classes: [
    {
      id: 1,
      name: 'B.Tech Computer Science & Engineering',
      teacher: 'Dr. Rajesh Kumar',
      description: 'Core CS fundamentals, programming, data structures, algorithms, and software engineering',
      materials: [
        { id: 1, name: 'Data Structures - Module 1.pdf', size: '2.4MB', date: '2025-01-10', type: 'pdf' },
        { id: 2, name: 'OOP Concepts.pptx', size: '5.2MB', date: '2025-01-12', type: 'pptx' },
      ],
    },
    {
      id: 2,
      name: 'B.Tech Electronics & Communication',
      teacher: 'Dr. Priya Sharma',
      description: 'Electronics circuits, communication systems, signal processing, and embedded systems',
      materials: [
        { id: 3, name: 'Digital Electronics Notes.pdf', size: '3.1MB', date: '2025-01-15', type: 'pdf' },
      ],
    },
    {
      id: 3,
      name: 'B.Tech Mechanical Engineering',
      teacher: 'Prof. Amit Verma',
      description: 'Thermodynamics, manufacturing processes, machine design, and industrial engineering',
      materials: [
        { id: 4, name: 'Thermodynamics Lecture.pdf', size: '4.2MB', date: '2025-01-18', type: 'pdf' },
      ],
    },
    {
      id: 4,
      name: 'B.Tech Civil Engineering',
      teacher: 'Dr. Sunita Singh',
      description: 'Structural engineering, construction management, transportation, and environmental engineering',
      materials: [
        { id: 5, name: 'Structural Analysis.pdf', size: '3.8MB', date: '2025-01-20', type: 'pdf' },
      ],
    },
    {
      id: 5,
      name: 'B.Tech Electrical Engineering',
      teacher: 'Prof. Vijay Gupta',
      description: 'Power systems, electrical machines, control systems, and power electronics',
      materials: [
        { id: 6, name: 'Power Systems Basics.pdf', size: '2.9MB', date: '2025-01-22', type: 'pdf' },
      ],
    },
    {
      id: 6,
      name: 'B.Tech Information Technology',
      teacher: 'Dr. Neha Agarwal',
      description: 'Database systems, web technologies, networking, and software development',
      materials: [
        { id: 7, name: 'Database Management.pdf', size: '3.5MB', date: '2025-01-25', type: 'pdf' },
      ],
    },
  ],
  
  addClass: (newClass) =>
    set((state) => ({
      classes: [...state.classes, newClass],
    })),

  addMaterial: (classId, material) =>
    set((state) => ({
      classes: state.classes.map((cls) =>
        cls.id === classId
          ? { ...cls, materials: [...cls.materials, material] }
          : cls
      ),
    })),

  getClassById: (classId) =>
    set((state) => ({
      currentClass: state.classes.find((cls) => cls.id === parseInt(classId)),
    })),

  deleteMaterial: (classId, materialId) =>
    set((state) => ({
      classes: state.classes.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              materials: cls.materials.filter((m) => m.id !== materialId),
            }
          : cls
      ),
    })),
}));
