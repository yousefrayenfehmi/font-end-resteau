import { useState, useEffect,useContext, createContext } from 'react';
import React from 'react';
import './menu_car.css';
import { creatcontexte } from '../createContext/createcontext';
const Menu = ({ cathegorie }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [checkboxes, setCheckboxes] = useState({});
    const {cart,addcart}=useContext(creatcontexte)
    useEffect(() => {
        const initialCheckboxes = {};
        if (cathegorie.additionalFields) {
            cathegorie.additionalFields.forEach(field => {
                initialCheckboxes[field.label] = false;
            });
        }
        setCheckboxes(initialCheckboxes);
    }, [cathegorie.additionalFields]);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();

        // Récupérer le panier existant depuis le localStorage
        /*const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
*/
        // Filtrer et ajouter les éléments sélectionnés au panier
        const selectedItems = cathegorie.additionalFields
            .filter(field => checkboxes[field.label])  // Vérifier si la case est cochée
            .map(field => ({
                id:cathegorie._id,
                taille: field.label,
                value: field.value,
                Name: cathegorie.name // Ajouter le nom de la catégorie (ou pizza)

            }));
            addcart(selectedItems)
            console.log(cart);
            
        //var updatedCart = [...cart, ...selectedItems];

        // Sauvegarder le panier mis à jour dans le localStorage
        /*localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log('Cart:', updatedCart);*/
        // Réinitialiser les cases à cocher après ajout au panier
        const resetCheckboxes = {};
        cathegorie.additionalFields.forEach(field => {
            resetCheckboxes[field.label] = false;
        });
        setCheckboxes(resetCheckboxes);
    };
    
    const handleCheckboxChange = (event) => {
        setIsFlipped(isFlipped);
        const { name, checked } = event.target;
        setCheckboxes(prevCheckboxes => ({
            ...prevCheckboxes,
            [name]: checked
        }));
    };
    const AddToCart=(event)=> {
        event.stopPropagation();
        const selectedItems = [{
            id:cathegorie._id,
            Name: cathegorie.name,
            value: cathegorie.price, // Ajouter le nom de la catégorie (ou pizza)
        }];
        addcart(selectedItems)
    }
    return (
        <div className={`card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleClick}>
            {!isFlipped && (
                <div className="card-content">
                    <h3 className="card-title">{cathegorie.name}</h3>
                    {cathegorie.additionalFields.length>0? <p className='card-description'>{cathegorie.description}</p>:<p className='card-description'>{cathegorie.price} DT</p>}
                </div>
            )}
            {isFlipped && (
                <div className="card-content-back">
                    <div className="card-title-back">
                    {cathegorie.additionalFields.length>0 && cathegorie.additionalFields.map((field, index) => (
                           <div key={`${field.label}-${index}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={field.label}
                                        checked={checkboxes[field.label] || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    {field.label} : {field.value} DT
                                </label>
                            </div>
                        ))}
                        {cathegorie.additionalFields.length<=0 &&(<div key={cathegorie._id}>
                            <p className='card-description'>{cathegorie.description}</p>
                            </div>)}
                    </div>
                    {cathegorie.additionalFields.length>0?<button 
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                    >
                        Ajouter au panier
                    </button>:<button 
                        className="add-to-cart-button"
                        onClick={AddToCart}
                    >
                        Ajouter au panier
                    </button>}
                    
                </div>
            )}
        </div>
    );
}
export default Menu;
