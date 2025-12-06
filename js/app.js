// Funciones principales de la aplicación

// Cambiar de pestaña
function showTab(tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar la pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Actualizar datos si es necesario
    if (tabName === 'dashboard' || tabName === 'students') {
        renderTables();
    }
}

// Actualizar estadísticas
function updateStats() {
    const stats = getStatistics();

    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-high').textContent = stats.high;
    document.getElementById('stat-medium').textContent = stats.medium;
    document.getElementById('stat-low').textContent = stats.low;

    // Mostrar alerta si hay estudiantes en riesgo alto
    const alertContainer = document.getElementById('alert-container');
    if (stats.high > 0) {
        alertContainer.innerHTML = `
            <div class="alert">
                <h3>⚠️ ¡Alerta! ${stats.high} estudiante${stats.high > 1 ? 's' : ''} en riesgo alto</h3>
                <p>Se recomienda intervención inmediata: contacto con tutor académico, 
                sesiones de apoyo personalizadas y seguimiento semanal.</p>
            </div>
        `;
    } else {
        alertContainer.innerHTML = '';
    }
}

// Renderizar tabla del dashboard
function renderDashboardTable() {
    const dashboardTable = document.getElementById('dashboard-table');
    const atRiskStudents = getAtRiskStudents();
    
    dashboardTable.innerHTML = atRiskStudents.map(student => {
        const risk = calculateRisk(student);
        const avg = calculateAverage(student.grades);
        
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.course}</td>
                <td><strong style="color: ${avg < 60 ? '#c62828' : avg < 70 ? '#f57f17' : '#495057'}">${avg}</strong></td>
                <td><strong style="color: ${student.attendance < 70 ? '#c62828' : student.attendance < 80 ? '#f57f17' : '#495057'}">${student.attendance}%</strong></td>
                <td><span class="badge ${risk.class}">${risk.level}</span></td>
            </tr>
        `;
    }).join('');
}

// Renderizar tabla de todos los estudiantes
function renderStudentsTable() {
    const studentsTable = document.getElementById('students-table');
    const allStudents = getAllStudents();
    
    studentsTable.innerHTML = allStudents.map(student => {
        const risk = calculateRisk(student);
        const avg = calculateAverage(student.grades);
        
        return `
            <tr>
                <td>${student.id}</td>
                <td><strong>${student.name}</strong></td>
                <td>${student.course}</td>
                <td>${student.grades.join(', ')}</td>
                <td><strong>${avg}</strong></td>
                <td>${student.attendance}%</td>
                <td>${student.participation}/10</td>
                <td>${student.assignmentsCompleted}/${student.totalAssignments}</td>
                <td><span class="badge ${risk.class}">${risk.level}</span></td>
            </tr>
        `;
    }).join('');
}

// Renderizar todas las tablas
function renderTables() {
    renderDashboardTable();
    renderStudentsTable();
    updateStats();
}

// Manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        course: document.getElementById('course').value,
        grades: document.getElementById('grades').value,
        attendance: document.getElementById('attendance').value,
        participation: document.getElementById('participation').value,
        assignmentsCompleted: document.getElementById('assignmentsCompleted').value,
        totalAssignments: document.getElementById('totalAssignments').value
    };

    const studentData = formatStudentData(formData);
    addStudent(studentData);
    
    // Limpiar formulario
    document.getElementById('student-form').reset();
    
    // Cambiar a dashboard
    showTab('dashboard');
    document.querySelector('.nav button:first-child').classList.add('active');
    
    alert('✅ Estudiante registrado exitosamente');
}

// Inicializar la aplicación
function init() {
    // Renderizar tablas iniciales
    renderTables();
    
    // Configurar event listener del formulario
    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}