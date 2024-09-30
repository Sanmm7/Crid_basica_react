// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/usuarios/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    });
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Link to="/add">Agregar Nuevo Usuario</Link>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.name}
            <Link to={`/edit/${usuario.id}`}>Editar</Link>
            <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
