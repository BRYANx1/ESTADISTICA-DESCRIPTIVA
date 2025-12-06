// Funciones de utilidad para cálculos y lógica

// Calcular riesgo de abandono
function calculateRisk(student) {
    const avgGrade = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
    const completionRate = (student.assignmentsCompleted / student.totalAssignments) * 100;
    
    let riskScore = 0;
    
    // Calificaciones (40 puntos máximo)
    if (avgGrade < 60) riskScore += 40;
    else if (avgGrade < 70) riskScore += 25;
    else if (avgGrade < 80) riskScore += 10;
    
    // Asistencia (30 puntos máximo)
    if (student.attendance < 70) riskScore += 30;
    else if (student.attendance < 80) riskScore += 15;
    
    // Participación (15 puntos máximo)
    if (student.participation < 5) riskScore += 15;
    else if (student.participation < 7) riskScore += 8;
    
    // Tareas (15 puntos máximo)
    if (completionRate < 60) riskScore += 15;
    else if (completionRate < 80) riskScore += 8;
    
    // Determinar nivel de riesgo
    if (riskScore >= 60) return { level: 'Alto', class: 'high' };
    if (riskScore >= 30) return { level: 'Medio', class: 'medium' };
    return { level: 'Bajo', class: 'low' };
}

// Calcular promedio de calificaciones
function calculateAverage(grades) {
    if (!grades || grades.length === 0) return 0;
    return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
}

// Obtener estadísticas generales
function getStatistics() {
    const allStudents = getAllStudents();
    return {
        total: allStudents.length,
        high: allStudents.filter(s => calculateRisk(s).level === 'Alto').length,
        medium: allStudents.filter(s => calculateRisk(s).level === 'Medio').length,
        low: allStudents.filter(s => calculateRisk(s).level === 'Bajo').length
    };
}

// Obtener estudiantes en riesgo
function getAtRiskStudents() {
    return getAllStudents().filter(s => calculateRisk(s).level !== 'Bajo');
}

// Formatear datos del formulario
function formatStudentData(formData) {
    return {
        name: formData.name,
        course: formData.course,
        grades: formData.grades ? 
            formData.grades.split(',').map(g => parseFloat(g.trim())).filter(g => !isNaN(g)) : 
            [100],
        attendance: parseFloat(formData.attendance) || 100,
        participation: parseFloat(formData.participation) || 10,
        assignmentsCompleted: parseInt(formData.assignmentsCompleted) || 10,
        totalAssignments: parseInt(formData.totalAssignments) || 10
    };
}