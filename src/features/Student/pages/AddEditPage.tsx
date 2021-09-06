import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Student } from '../../../models/student';
import studentApi from '../../../api/studentApi';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();
  const history = useHistory();
  const isEdit = Boolean(studentId);

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    console.log('🚀 ~ file: AddEditPage.tsx ~ line 29 ~ handleStudentFormSubmit ~ formValues', formValues);
    // TODO: Handle submit here, call API  to add/update student
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    // Toast success
    toast.success('Save student successfully!');

    // Redirect back to student list
    history.push('/admin/students');
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft />
          Back
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
