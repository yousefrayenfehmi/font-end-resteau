import React, { useState } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DrawerAppBar from '../navbar';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import QRCodeGenerator from './qrcode';
const TableForm = () => {
  const [tableName, setTableName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [afftable, setAfftable] = useState(false);
  const [tables, setTables] = useState([]);
  const [id, setid] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
  
      // Envoyer les données de la table au backend
      await axios.post('http://localhost:3000/table', {
        name: tableName,
        numberOfSeats: numberOfSeats,
      }).then(response=>{
        setTableName('')
        setNumberOfSeats('')
        handletable();
      }).catch(err=>{
        console.log(err);
      });
  
    
  };
  const handletable=async()=>{
    await axios.get('http://localhost:3000/showtable').then(Response=>{
        setAfftable(true)
      
        setTables(Response.data)
        console.log(tables);
    }).catch(err=>{
        console.log(err);
    });
  }
  const handlemodf=async()=>{
    console.log(id);
    await axios.put(`http://localhost:3000/updatetable/${id}`,{
      name: tableName,
      numberOfSeats: numberOfSeats,
  }).then(Response=>{
      handletable();
      setTableName('')
      setNumberOfSeats('')
      setid('')
  }).catch(err=>{
      console.log(err);
  });
  }
  const handeledelete=async(id)=>{
    await axios.delete(`http://localhost:3000/deltable/${id}`).then(Response=>{
        handletable();
    }).catch(err=>{
        console.log(err);
    });
  }
  return (
    <div>
      <DrawerAppBar/>
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Ajouter une table
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nom de la table"
          variant="outlined"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Nombre de places"
          variant="outlined"
          type="number"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Soumettre
        </Button>
        <Button onClick={handletable} variant="contained" color="secondary">
        Afficher Table
      </Button>
      <Button onClick={handlemodf} variant="contained" color="warning">
        modifier table
      </Button>
      </Box>
      {afftable && (<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom de la Table</TableCell>
            <TableCell>Nombre de Places</TableCell>
            <TableCell>QR Code</TableCell>
            <TableCell colSpan={2} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tables.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numberOfSeats}</TableCell>
              <TableCell><QRCodeGenerator url={`https://restaurant.com/order?table=${item._id}`} /></TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handeledelete(item._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="warning" 
                  onClick={() => {
                    setTableName(item.name);
                    setNumberOfSeats(item.numberOfSeats);
                    setid(item._id);
                  }}
                >
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    
    </Container>
    </div>
  );
};

export default TableForm;
