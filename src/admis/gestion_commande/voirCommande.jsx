import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CreatContexte } from '../createcontext/creatscontext';
import { Button, Box, Typography } from '@mui/material';
import Gestion_commande from './gestion_commande';

export default function CommandeTable({ food, id }) {
    const { change, changes } = useContext(CreatContexte);
    const [data, setData] = useState([]);
    const [isclicked, setIsclicked] = useState(true);

    const fetchData = async () => {
        const updatedFood = await Promise.all(
            food.map(async (item) => {
                try {
                    const res = await axios.get(`http://localhost:3000/show/${item.id}`);
                    return { ...item, name: res.data.name };
                } catch (err) {
                    console.error(err);
                    return item;
                }
            })
        );
        setData(updatedFood);
    };

    useEffect(() => {
        fetchData();
    }, [food]);

    const handleValidation = (row,idrow) => {
        console.log(row);
        row.etat = 'pret';
        console.log(data);
        axios.put(`http://localhost:3000/updateitem/${id}`, data)
            .then(async (response) => {
                console.log(response);
                
                setData((prevData) =>
                    prevData.map((item,index) => (item.id === row.id && index===idrow ? { ...item, etat: 'pret' } : item))
                );
                await changes(!change);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 3,
                backgroundColor: '#f5f5f5',
                minHeight: '100vh',
            }}
        >
            {isclicked ? (
                <TableContainer component={Paper} sx={{ maxWidth: '800px', boxShadow: 3, borderRadius: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="commande table">
                        <TableHead sx={{ backgroundColor: '#1976d2' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">État</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <>
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { backgroundColor: '#f0f0f0' },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                            {row.name} {row.taille ? `de taille ${row.taille}` : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">{row.etat}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            disableElevation
                                            sx={{ fontWeight: 'bold' }}
                                            onClick={() => handleValidation(row,index)}
                                        >
                                            Valider
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                 </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Gestion_commande />
            )}
            {isclicked && (
                <Button
                    variant="outlined"
                    disableElevation
                    sx={{ marginTop: 3 }}
                    onClick={() => setIsclicked(false)}
                >
                    Retour
                </Button>
            )}
        </Box>
    );
}
