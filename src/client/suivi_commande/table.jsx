import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { io } from 'socket.io-client';
export default function DenseTable({ food }) {
    const [data, setData] = useState([]);
    const socket = io('http://localhost:3000');
    useEffect(() => {
        socket.on('updateCommande',(res)=>{
           setData(res)
        })
        const fetchData = async () => {
            const updatedFood = await Promise.all(
                food.map(async item => {
                    try {
                        const res = await axios.get(`http://localhost:3000/show/${item.id}`);
                        return { ...item, name: res.data.name };
                    } catch (err) {
                        console.error(err);
                        return item; // Retourne l'élément original en cas d'erreur
                    }
                })
            );
            setData(updatedFood);
        };

        fetchData();
        return () => {
            socket.close();
        };
    }, [food]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="right">État</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name} {row.taille ? `de taille ${row.taille}` : ''}
                            </TableCell>
                            <TableCell align="right">{row.etat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
