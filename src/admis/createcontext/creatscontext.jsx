import { createContext, useState, useEffect } from "react";

// Création du contexte
export const CreatContexte = createContext();

export default function Creattexto({ children }) {
    const [change, setChange] = useState(false);

    // Fonction pour inverser la valeur de "change"
    const changes = () => setChange(!change);

    // useEffect pour suivre les changements
    useEffect(() => {
        console.log("Le statut de 'change' a été modifié :", change);
    }, [change]);

    return (
        <CreatContexte.Provider value={{ change, changes }}>
            {children}
        </CreatContexte.Provider>
    );
}
