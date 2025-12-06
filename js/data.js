// Base de datos en memoria
let students = [
    {
        id: 1,
        name: "Ana García",
        course: "Cálculo I",
        grades: [85, 78, 72],
        attendance: 85,
        participation: 7,
        assignmentsCompleted: 8,
        totalAssignments: 10
    },
    {
        id: 2,
        name: "Carlos López",
        course: "Programación",
        grades: [45, 38, 42],
        attendance: 55,
        participation: 3,
        assignmentsCompleted: 4,
        totalAssignments: 10
    },
    {
        id: 3,
        name: "María Rodríguez",
        course: "Física II",
        grades: [92, 88, 90],
        attendance: 95,
        participation: 9,
        assignmentsCompleted: 10,
        totalAssignments: 10
    }
];

// Funciones para manejar los datos
function getAllStudents() {
    return students;
}

function addStudent(student) {
    student.id = students.length + 1;
    students.push(student);
    return student;
}

function getStudentById(id) {
    return students.find(s => s.id === id);
}

function updateStudent(id, updatedData) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedData };
        return students[index];
    }
    return null;
}

function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        return true;
    }
    return false;
}