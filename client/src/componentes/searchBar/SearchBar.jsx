import { useState } from "react";
import { useSelector } from "react-redux";
import styles from './searchBar.module.css';

export default function SearchBar({onSearch}){
    const pokemonSearch = useSelector((state)=> state.searchPokemon.pokemon)
    const [name, setName] = useState('')
    const buscar = '../../public/buscar.png';
    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSearch(){
        onSearch(name);
        setName('');
    }

    return (
        <div className={styles.inputForm}> 
            <div className={styles.formIcons}>
                <img src={buscar} alt="visible" onClick={handleSearch}/>
            </div>
            <input 
                type="text" 
                placeholder="pokemon"
                value={name}
                onChange={handleChange}
            />
        </div>

    )
}