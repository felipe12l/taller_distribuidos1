
    const API = {
      estudiantes: '/api/estudiantes',
      cursos: '/api/cursos',
      inscripciones: '/api/inscripciones'
    };

    function renderEstudiantes(estudiantes) {
      const tbody = document.querySelector('#tabla-estudiantes tbody');
      tbody.innerHTML = '';
      estudiantes.forEach(e => {
        tbody.innerHTML += `<tr><td>${e.id_estudiante}</td><td>${e.nombre}</td><td>${e.email}</td></tr>`;
      });
      // Para el select de inscripciones
      const select = document.getElementById('select-estudiante');
      select.innerHTML = '';
      estudiantes.forEach(e => {
        select.innerHTML += `<option value="${e.id_estudiante}">${e.nombre}</option>`;
      });
    }

    function renderCursos(cursos) {
      const tbody = document.querySelector('#tabla-cursos tbody');
      tbody.innerHTML = '';
      cursos.forEach(c => {
        tbody.innerHTML += `<tr><td>${c.id_curso}</td><td>${c.nombre}</td><td>${c.creditos}</td></tr>`;
      });

      const select = document.getElementById('select-curso');
      select.innerHTML = '';
      cursos.forEach(c => {
        select.innerHTML += `<option value="${c.id_curso}">${c.nombre}</option>`;
      });
    }

    function renderInscripciones(inscripciones) {
      const tbody = document.querySelector('#tabla-inscripciones tbody');
      tbody.innerHTML = '';
      inscripciones.forEach(i => {
        tbody.innerHTML += `<tr>
          <td>${i.id_inscripcion}</td>
          <td>${i.nombre_estudiante}</td>
          <td>${i.nombre_curso}</td>
          <td>${i.fecha}</td>
        </tr>`;
      });
    }

    async function cargarDatos() {
      const [estudiantes, cursos, inscripciones] = await Promise.all([
        fetch(API.estudiantes).then(r => r.json()),
        fetch(API.cursos).then(r => r.json()),
        fetch(API.inscripciones).then(r => r.json())
      ]);
      renderEstudiantes(estudiantes);
      renderCursos(cursos);
      renderInscripciones(inscripciones);
    }


    document.getElementById('form-estudiante').onsubmit = async e => {
      e.preventDefault();
      const nombre = document.getElementById('nombre-estudiante').value;
      const email = document.getElementById('email-estudiante').value;
      await fetch(API.estudiantes, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, email})
      });
      cargarDatos();
      e.target.reset();
    };

    document.getElementById('form-curso').onsubmit = async e => {
      e.preventDefault();
      const nombre = document.getElementById('nombre-curso').value;
      const creditos = document.getElementById('creditos-curso').value;
      await fetch(API.cursos, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, creditos})
      });
      cargarDatos();
      e.target.reset();
    };

    document.getElementById('form-inscripcion').onsubmit = async e => {
      e.preventDefault();
      const id_estudiante = document.getElementById('select-estudiante').value;
      const id_curso = document.getElementById('select-curso').value;
      const fecha = document.getElementById('fecha-inscripcion').value;
      await fetch(API.inscripciones, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_estudiante, id_curso, fecha})
      });
      cargarDatos();
      e.target.reset();
    };

 
    cargarDatos();