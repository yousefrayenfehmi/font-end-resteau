import { useState } from 'react'
import DrawerAppBar from './admis/navbar'
import RestaurantForm from './admis/gestion de nourritures/gestion de nourriturs';
import TableForm from './admis/gestion de table/gestiontable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './client/card.jsx';
import AddCategory from './admis/gestion cathegorie/gestion cathegorie.jsx';
import FoodDetails from './admis/gestion de nourritures/FoodDetails.jsx';
import MenuCard from './client/menu card/menu _card.jsx';
import Cards from './client/card/cards.jsx';
import Suivi_commande from './client/suivi_commande/suivi_commande.jsx';
import Gestion_commande from './admis/gestion_commande/gestion_commande.jsx';
import Creattexto from './admis/createcontext/creatscontext.jsx';
import SalesBarChart from './admis/chart/chart.jsx';
function App() {

  return (
    <div>
      <Router>
      <Creattexto>
      <Routes>
        {/* Other routes */}
        
        <Route path="/menu/:id" element={<Cards />} />
        <Route path="/suivi_commande/:id" element={                
          <Suivi_commande />}/>
        <Route path="/admin" element={<DrawerAppBar />} />
        <Route path="/admin/gestion-nourriture" element={<div><RestaurantForm/></div>} />
        <Route path="/admin/gestion-table" element={<div><TableForm/></div>} />
        <Route path="/admin/gestion-commande" element={<div><Gestion_commande /></div>} />
        <Route path="/admin/gestion-cathegorie" element={<div><AddCategory /></div>} />
        <Route path="/admin/detailles/:id" element={<div><FoodDetails /></div>} />
        <Route path="/admin/statistique" element={<div><SalesBarChart/></div>} />
        <Route path="/cards" element={<div><MenuCard /></div>} />
        
      </Routes>
      </Creattexto>
    </Router>
      
      
      </div>
  )
}

export default App
