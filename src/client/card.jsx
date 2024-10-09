import React, { useState, useEffect } from 'react';
import './card.css';
import axios from 'axios';
import Menu from './menu card/menu _card';
import ResponsiveAppBar from './navvbar/navbar';
import Creattexto from './createContext/createcontext';
import { useParams } from 'react-router-dom';

// Card component
const MenuCard = ({ category, onClick, isActive, menu }) => {
  return (
    <div className="menu-card">
      <h2 onClick={() => onClick(category.name, category._id)}>{category.name}</h2>
      {isActive && menu && (
        <div className="menu-container">
          {menu.map((item) => (
            <Menu key={item._id} cathegorie={item} />
          ))}
        </div>
      )}
    </div>
  );
};

// Menu Page component
const MenuPage = ({Numtab}) => {

  const [activeMenus, setActiveMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState({});
  const { id } = useParams();
  const handleCardClick = async (type, id) => {
    try {
      const res = await axios.get(`http://localhost:3000/search/${type}`);
      setMenus(prevMenus => ({
        ...prevMenus,
        [id]: res.data
      }));

      // Toggle the category visibility
      setActiveMenus(prev =>
        prev.includes(id)
          ? prev.filter(menuId => menuId !== id)
          : [...prev, id]
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(id);
    
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/showcathegorie");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div id="menu">
        <Creattexto>
          <ResponsiveAppBar Numtab={Numtab} /> {/* La Navbar se rendra à chaque changement */}
          
          <div className="menu-page">
            {categories.map((category) => (
              <MenuCard
                key={category._id}
                category={category}
                onClick={handleCardClick}
                isActive={activeMenus.includes(category._id)}
                menu={menus[category._id] || []}
              />
            ))}
          </div>
        </Creattexto>
      </div>
    </>
  );}

export default MenuPage;
