import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import DrawerAppBar from '../navbar';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [ok, setOk] = useState('');
  const [id,setId]=useState('')
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/showcathegorie');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/cathegorie', { name: categoryName });
      setCategoryName('');
      setOk('success');
      fetchCategories();
    } catch (error) {
      setOk('error');
      console.error('Erreur lors de l\'ajout de la catégorie', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delcathegorie/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };

  const handleEdit = async () => {
    try {
      console.log(categoryName);
      console.log(id);
      
      await axios.put(`http://localhost:3000/upcathegorie/${id}`, { name: categoryName });
      setCategoryName('');
      setOk('success');
      fetchCategories();
    } catch (error) {
      setOk('error');
      console.error('Erreur lors de la modification de la catégorie', error);
    }
  };

  return (
    <div>
      <DrawerAppBar />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Ajouter une nouvelle catégorie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label="Nom de la catégorie"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={ok}
            required
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Ajouter
          </Button>
          <Button variant="contained" color="warning"  onClick={handleEdit}>
            Modifier
          </Button>
        </Box>

        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell align="center" colSpan={2}>Actions</TableCell> {/* colSpan added here */}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category._id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      style={{ marginRight: '10px' }}
                      onClick={() =>{ setCategoryName(category.name)
                        setId(category._id)}
                      }
                    >
                      Modifier
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(category._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default AddCategory;
