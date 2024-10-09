import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import DenseTable from './tablecommande';
import DrawerAppBar from '../navbar';
const Gestion_commande = () => {
    const [data, setData] = useState([]);
    const [tableNames, setTableNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [commande,setCommande]=useState({});
    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getall');
                setData(response.data);
                console.log(response.data);
                
                // Fetch table names for each item
                const names = {};
                for (const item of response.data) {
                        const res = await axios.get(`http://localhost:3000/gettablebyid/${item.idtab}`);
                        names[item.idtab] = res.data.name;
                }
                setTableNames(names);
                console.log(tableNames);
                
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };


        // Call the async function
        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <DrawerAppBar/>
            <DenseTable  name={tableNames} data={data}/>
        </>
    );
};

export default Gestion_commande;
