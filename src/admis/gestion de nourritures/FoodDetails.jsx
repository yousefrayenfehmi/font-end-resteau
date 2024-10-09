import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DrawerAppBar from '../navbar';
const FoodDetails = () => {
  const { id } = useParams(); // Get the food ID from the URL
  const [foodItem, setFood] = useState([]);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/show/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchFoodDetails();
  }, [id]);

  if (!foodItem) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <DrawerAppBar/>
    
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Détails du plat
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Étiquette</TableCell>
              <TableCell>Valeur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{foodItem.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>{foodItem.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{foodItem.description}</TableCell>
            </TableRow>
            {foodItem.price && (
              <TableRow>
                <TableCell>Prix</TableCell>
                <TableCell>{foodItem.price} </TableCell>
              </TableRow>
            )}
            {foodItem.additionalFields && foodItem.additionalFields.map((field, index) => (
              <TableRow key={index}>
                <TableCell>{field.label}</TableCell>
                <TableCell>{field.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default FoodDetails;
