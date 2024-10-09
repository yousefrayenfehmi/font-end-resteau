import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import DenseTable from './table';
import { CreatContexte } from '../../admis/createcontext/creatscontext';
import { useContext } from 'react';
import { io } from 'socket.io-client';
const Suivi_commande = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const {change,changes}=useContext( CreatContexte)
    const socket = io('http://localhost:3000');
    const fetch=()=>{
        axios.get(`http://localhost:3000/getcombyid/${id}`)
        .then(response => {
            console.log(response.data);
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
    useEffect(() => {
        socket.on('updateCommande', (msg) => {
            setData(data=>data.etat_commande!=='payeè')
        })
        
        fetch()        
        
        
    }, [id]);

    const renderContent = (content) => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url("/img/back.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.5)',
                borderRadius: '15px'
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond avec transparence
                    padding: '30px 50px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                    textAlign: 'center'
                }}
            >
                {content}
            </Box>
        </Box>
    );

    if (loading) {
        return renderContent(<CircularProgress />);
    }

    if (!data || data.etat_commande==='payeè') {
        return renderContent(
            <>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Arial, sans-serif',
                        color: '#000',
                        marginBottom: '20px',
                    }}
                >
                    Aucune commande n'a été passée pour le moment.
                </Typography>
                <Link to={`/menu/${id}`}>
                    <Button variant="contained" color="primary">
                        Retour au Menu
                    </Button>
                </Link>
            </>
        );
    }
    if(change){
        fetch()
        changes()
    }

    if (data.etat_commande === "non-confirmer") {
        return renderContent(
            <>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Arial, sans-serif',
                        color: '#000',
                        marginBottom: '20px',
                    }}
                >
                    Votre demande est en cours de traitement.
                </Typography>
                <Typography>
                <CircularProgress />
                </Typography>
                <Link to={`/menu/${id}`}>
                    <Button variant="contained" color="primary">
                        Retour au Menu
                    </Button>
                </Link>
            </>
        );
    }

    if (data.etat_commande === "non-payeè") {
        return renderContent(
            <>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Arial, sans-serif',
                        color: '#000',
                        marginBottom: '20px',
                    }}
                >
                    <DenseTable food={data.orders} key={data._id}/>
                </Typography>
                <Link to={`/menu/${id}`}>
                    <Button variant="contained" color="primary">
                        Retour au Menu
                    </Button>
                    
                </Link>
                
                <br/>
                <Button variant="contained" color="primary" onClick={()=>{
                    console.log('hhhhh');
                    data.etat_commande="payeè"
                    const id=data._id
                    delete data._id
                    axios.put(`http://localhost:3000/updatecommande/${id}`,data)
                    .then(response => {
                        console.log(response.data);
                        socket.emit('updateCommande');
                    })
                    .catch(error => {
                        console.error('Error updating data:', error);
                    })
                    
                }}>
                        addition
                    </Button>
            </>
        );
    }
};
export default Suivi_commande;
