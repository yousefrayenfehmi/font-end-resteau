import React, { useState,useEffect } from 'react';
import {  InputLabel, Select, MenuItem,TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import DrawerAppBar from '../navbar';
import { useNavigate } from 'react-router-dom';
const RestaurantForm = () => {
  const [foodType, setFoodType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [additionalFields, setAdditionalFields] = useState([]);
  const [id,setId]=useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [edit, setEdit] = useState('');
  const [cathe, setCathe] = useState([]);

  const navigate = useNavigate();

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { label: '', value: '' }]);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = additionalFields.map((f, i) =>
      i === index ? { ...f, [field]: value } : f
    );
    setAdditionalFields(updatedFields);
  };
useEffect(
  ()=>{
        const fetchcath=async()=>{
            await axios.get('http://localhost:3000/showcathegorie').then(res=>{
                setCathe(res.data)
                console.log(cathe);
            }).catch(err=>{
              console.log(err);
            })
        }
        fetchcath();
  },[]
)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const foodData = {
      type: foodType,
      name,
      description,
      price,
      additionalFields,
    };

    try {
      // Envoyer foodData au backend
      await axios.post("http://localhost:3000/food", foodData);

      // Ajouter le nouvel item à la liste des food items
      setFoodItems([...foodItems, foodData]);

      // Réinitialiser le formulaire
      setFoodType('');
      setName('');
      setDescription('');
      setPrice('');
      setAdditionalFields([]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = (index) => {
    axios.delete(`http://localhost:3000/del/${index}`)
      .then((res) => {
        console.log(res.data);
        handelfood();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelfood = () => {
    axios.get("http://localhost:3000/show")
      .then((res) => {
        console.log(res.data);
        setFoodItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
const handeledit=async()=>{
    const foodData = {
        type: foodType,
        name,
        description,
        price,
        additionalFields,
      };
      console.log(foodData);
      axios.put(`http://localhost:3000/up/${id}`, foodData)
      .then((res) => {
        console.log(res.data);
        handelfood();
      })
      .catch((err) => {
        console.log(err);
      });
}

  return (
    <div>
      <DrawerAppBar/>
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Ajouter un nouveau plat
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <FormControl variant="outlined" fullWidth required>
  <InputLabel>Type de nourriture</InputLabel>
  <Select
    value={foodType}
    onChange={(e) => setFoodType(e.target.value)}
    label="Type de nourriture"
  >
    {cathe.length>0 && cathe.map((item,index)=>{
      return(
        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      )
    })}
  </Select>
</FormControl>
        <TextField
          label="Nom"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
        />
         <FormControl component="fieldset">
          <FormLabel component="legend">Voud_douvez ajouter des detailles</FormLabel>
          <RadioGroup
            aria-label="foodType"
            name="foodType"
            value={foodType}
            onChange={(e) => setEdit(e.target.value)}
          >
            <FormControlLabel  value="oui" control={<Radio />} label="Oui" />
            <FormControlLabel value="non" control={<Radio />} label="Non" />
          </RadioGroup>
        </FormControl>
        {edit === 'non' && (
          <TextField
          label="Prix"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
        />
        )}
        {edit==='oui' && additionalFields.map((field, index) => (
          <Box key={index} sx={{ display: 'flex', gap: '1rem' }}>
            <TextField
              label="taille"
              variant="outlined"
              value={field.label}
              onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="prix"
              variant="outlined"
              value={field.value}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              required
              fullWidth
            />
          </Box>
        ))}
        {edit === 'oui' && (
          <Button variant="contained" color="primary" onClick={handleAddField}>
            Ajouter un  taille
          </Button>
        )}
        <Button variant="contained" color="primary" type="submit">
          Ajouter
        </Button>
        <Button onClick={handelfood} variant="contained" color="primary">
          Afficher Food
        </Button>
        <Button onClick={handeledit}
                  variant="contained" 
                  color="warning"  >
                  Modifier
                </Button>
      </Box>

      {foodItems.length > 0 && ((<TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Descrition</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell colSpan={3} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDelete(item._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate(`/admin/detailles/${item._id}`)}
                >
                  detailles
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="warning" 
                  onClick={()=>{
                    console.log(item._id);
                    setId(item._id);
                    setFoodType(item.type);
                    setName(item.name);
                    setDescription(item.description);
                    setPrice(item.price);
                    setAdditionalFields(item.additionalFields);
                  }}
                >
                  Modifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>))}
    </Container>
    </div>
  );
};

export default RestaurantForm;
