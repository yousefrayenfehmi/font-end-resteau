import axios from 'axios';
import React,{Children, useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import './chart.css'
import Charts from './cardre';
import { Button } from '@mui/material';
const Dives = ({ children }) => {
  return (
    <div className='stat'>
      {children}
    </div>
  );
}
const SalesBarChart = () => {

  const [data,setData]=useState()
  const [datatype,setDatatype]=useState()
  const [datefrom,setDatefrom]=useState(new Date().toISOString().substring(0, 10));
  const [dateto,setDateto]=useState(new Date().toISOString().substring(0, 10));
  const [type,setType]=useState('pizza')
  const fetch=async()=>{
    await axios.get(`http://localhost:3000/showstat`,{params: {
      from: datefrom,
      to: dateto
    }}).then(result=>{
          console.log(result.data);
          setData(result.data)            
    }).catch(err=>{
      console.log(err);
      
    })
  }
  const handeltype=(event)=>{
             setType(event.target.value)
  }
  const fetchtype=async()=>{
    const pr={types:type,from:datefrom,to:dateto}

    await axios.get(`http://localhost:3000/showstattype`,{params:pr}).then(result=>{
          console.log(result.data);
          
          setDatatype(result.data)            
    }).catch(err=>{
      console.log(err);
      
    })
  }
  useEffect(() => {
    fetch()
    fetchtype()
  },[] );
  const handelclick=()=>{
    fetch()
    
  }
  const handleChange = (event,type) => {
      {type==='from'?setDatefrom(event.target.value):setDateto(event.target.value)}
  };
return(
  <>
      {data&& (<Dives>
    <h2>Articles les plus vendus</h2>
      <Charts data={data}></Charts>
      <div className='date'>
        from:
        <input type="date" value={datefrom} onChange={(event) => handleChange(event, 'from')} />
        to:
        <input type="date" value={dateto} onChange={(event) => handleChange(event, 'to')} />
      </div>
      <div className='button-container'>
        <Button
          className='btn'
          variant="contained"
          color="primary"
          onClick={handelclick}
        >
          Confirmer
        </Button>
    </div>
  </Dives>)}
  {datatype && (<Dives>
  <h2>Articles les plus vendus</h2>
    <Charts data={datatype}></Charts>
    <div className='date'>
      from:
      <input type="date" value={datefrom} onChange={(event) => handleChange(event, 'from')} />
      to:
      <input type="date" value={dateto} onChange={(event) => handleChange(event, 'to')} />
      <select name="" id="" onChange={handeltype}>
      <option  value="chose">chosse type</option>
        {data.map(item=>(
              <option key={item.name} value={item.name} >{item.name}</option>
        ))}
      </select>
    </div>
    
    <div className='button-container'>
      <Button
        className='btn'
        variant="contained"
        color="primary"
        onClick={()=>{
          fetchtype()
        }}
      >
        Confirmer
      </Button>
  </div>
</Dives>)}
  
  </>
)
  
}


export default SalesBarChart;