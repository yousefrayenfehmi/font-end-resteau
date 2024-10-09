import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CommandeTable from './voirCommande';
import { io } from 'socket.io-client';
import axios from 'axios';

export default function DenseTable({ name, data }) {
    const [ok, setFalse] = React.useState(false);
    const [orders, setOrders] = React.useState(null);
    const [id, setId] = React.useState('');
    const [commandes, setCommandes] = React.useState(data);
    const socket = io('http://localhost:3000');
    const [update, setUpdate] = React.useState('non');

    useEffect(() => {
        setCommandes(prev=>prev.filter(item=>item.etat_commande!=='payeè'))
        
        socket.on('newCommande', (newOrder) => {
                setCommandes((prevOrders) => [...prevOrders, newOrder.commande]);
                name[newOrder.commande.idtab] = newOrder.name;
                console.log(name);
           
        });
        socket.on('updateCommande',(msg)=>{
                if(msg.etat_commande==='payeè'){
                    setCommandes((prev) => 
                        prev.filter((item) => item.idtab !== msg.idtab) 
                    );
                console.log(commandes);}
                
        })
        socket.on('updateitem', msg => {
            setCommandes((prev) => 
                prev.map((item) => item._id === msg.id ? { ...item, orders:msg.body} : item)
            );
            setUpdate('mise a jour effectuee')
        });

        return () => {
            socket.close();
        };
    }, [socket]);

    const onAccept = async (row) => {
        try {
            const id = row._id;
            const updatedRow = { ...row, etat_commande: 'non-payeè' };
            delete updatedRow._id;

            await axios.put(`http://localhost:3000/updatecommande/${id}`, updatedRow);
            setCommandes((prev) => 
                prev.map((cmd) => cmd._id === id ? { ...cmd, etat_commande: 'non-payeè' } : cmd)
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la commande :", err);
        }
    };

    const onCancel = (row) => {
        axios.delete(`http://localhost:3000/delcommande/${row._id}`)
            .then(res => {
                setCommandes(commandes.filter(cmd => cmd._id !== row._id));
            })
            .catch(err => console.error(err));
    };

    const onConfirm = (row) => {
        setFalse(true);
        setOrders(row.orders);
        setId(row._id);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                padding: '20px',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '30px',
                    width: '100%',
                    maxWidth: '800px',
                }}
            >
                {ok === false ? (
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: '100%',
                            maxHeight: '400px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            overflowY: 'auto',
                            padding: '20px',
                        }}
                    >
                        <Table size="medium" aria-label="Commande Table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Table</TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mise à jour</TableCell>
                                    <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }} colSpan="2">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {commandes.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f9f9f9' } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {name[row.idtab]}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {update}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                {row.etat_commande === 'non-confirmer' ? (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => onAccept(row)}
                                                            sx={{ marginRight: '8px' }}
                                                        >
                                                            Accepter
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => onCancel(row)}
                                                            sx={{ marginRight: '8px' }}
                                                        >
                                                            Annuler
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => onConfirm(row)}
                                                    >
                                                        Confirmer
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <CommandeTable food={orders} id={id} />
                )}
            </Box>
        </Box>
    );
}
