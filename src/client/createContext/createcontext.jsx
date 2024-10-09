import { createContext, useState,useEffect } from "react";
export const creatcontexte=createContext(0);

const Creattexto=({children})=>{
    const [cart ,setcart]=useState(()=>{
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    })
    useEffect(() => {
        // Sauvegarder le panier dans localStorage à chaque mise à jour
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const addcart=(item)=>{
        setcart(prev=>[...prev,...item])
    
    }
    const videcart=()=>{
        setcart([])
    }
    const supprimeritem=(id)=>{
        setcart(prev=>prev.filter((item, index) => index !== id))
    }
    return(
        <creatcontexte.Provider value={{cart,addcart,videcart,supprimeritem}} >
            {children}
        </creatcontexte.Provider>
    )
}
export default Creattexto;