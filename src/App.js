import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'rahil',
      email: 'rahil@example.com',
      phone: '1234567890',
      marks: '',
      passFail: ''
    },
    {
      id: 2,
      name: 'makwana',
      email: 'makwana@example.com',
      phone: '9876543210',
      marks: '',
      passFail: ''
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(1);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    marks: '',
    passFail: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.phone || !formData.marks) {
    alert('Please fill in all fields');
    return;
  }

  const existingStudentIndex = students.findIndex(student => student.id === formData.id);
  if (existingStudentIndex !== -1) {
    const updatedStudents = [...students];
    updatedStudents[existingStudentIndex] = {
      ...formData,
      marks: parseInt(formData.marks),
      passFail: formData.marks >= 60 ? 'Pass' : 'Fail'
    };
    setStudents(updatedStudents);
  } else {
    const newStudent = {
      id: students.length + 1,
      ...formData,
      marks: parseInt(formData.marks),
      passFail: formData.marks >= 60 ? 'Pass' : 'Fail'
    };
    setStudents([...students, newStudent]);
  }


  setFormData({
    id: null,
    name: '',
    email: '',
    phone: '',
    marks: '',
    passFail: ''
  });
};


  const editStudent = id => {
    const studentToEdit = students.find(student => student.id === id);
    setFormData({ ...studentToEdit });
  };

  return (
    <div className="App">
      <h1>Student Information List</h1>
      <ul>
        {currentStudents.map(student => (
          <li key={student.id}>
            <p>Name: {student.name}</p>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
            <p>Marks: {student.marks}</p>
            <p>Pass/Fail: {student.passFail}</p>
            <button onClick={() => editStudent(student.id)}>Edit</button>
          </li>
        ))}
      </ul>
      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={students.length}
        paginate={paginate}
      />
      <h2>Add/Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
        />
        <button type="submit">{formData.id ? 'Edit' : 'Add'}</button>
      </form>
    </div>
  );
}

const Pagination = ({ studentsPerPage, totalStudents, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
