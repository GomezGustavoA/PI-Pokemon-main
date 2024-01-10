import { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from './cards.module.css';
import { removeSearchPokemon } from "../../redux/searchPokemon";
import { useDispatch, useSelector } from 'react-redux';
import { addDetail } from "../../redux/detail";
import { Link } from "react-router-dom";
import { orderAscendente, orderDescendente, orderDescendenteAtack, 
    orderAscendenteAtack, filterAll, filterApi, filterDB, filterType} from "../../redux/pokemonSlice";

function Cards (){
    const view = useSelector((state)=> state.searchPokemon.stateView)
    const pokemons = useSelector((state) => state.pokemon.allPokemon);

    const viewPokemon = useSelector((state)=> state.searchPokemon.pokemon);
    const dispatch = useDispatch();

    const flechaDer = '../../public/der.png';
    const flechaIzq = '../../public/izq.png';
    const pokendex = '../../public/pokedex.png';
    const closePo = '../../public/clo.png';
    const [dataFinist, setDataFinish] = useState(12)
    const [currentPage, setCurrentPage] = useState(1)

    const indexFin = currentPage * dataFinist;
    const indexIni = indexFin - dataFinist;
    const nPokemons = pokemons.slice(indexIni, indexFin);
    const nPages = Math.ceil(pokemons.length / dataFinist);


    useEffect(() => {
        // Configuración inicial
        document.documentElement.style.setProperty('--before-transform', 'translate(100%, -50%)');
        document.documentElement.style.setProperty('--before-right', '115%');

        const timeoutId = setTimeout(() => {
            // Configuración después de 1000 milisegundos (1 segundo)
            document.documentElement.style.setProperty('--opacity', '1');
          }, 500);

        // La función de limpieza, se ejecutará cuando el componente se desmonte
        return () => {
        clearTimeout(timeoutId);
        // Configuración al desmontar el componente
        document.documentElement.style.setProperty('--before-transform', 'translateY(-50%)');
        document.documentElement.style.setProperty('--before-right', '60%');
        document.documentElement.style.setProperty('--opacity', '0');
        };
    }, []);

    useEffect(() => {
        let timeoutId;
    
        if (view) {
            // Establecer variables CSS e iniciar temporizador
            document.documentElement.style.setProperty('--grid-template-columns', '60% auto');
            document.documentElement.style.setProperty('--grid-template-columns-cards', '1fr 1fr 1fr');
            timeoutId = setTimeout(() => {
                document.documentElement.style.setProperty('--opacity-poke', '1');
            }, 500);
        } else {
            // Establecer variables CSS e iniciar temporizador
            document.documentElement.style.setProperty('--grid-template-columns', 'auto');
            document.documentElement.style.setProperty('--grid-template-columns-cards', '1fr 1fr 1fr 1fr');
            timeoutId = setTimeout(() => {
                document.documentElement.style.setProperty('--opacity-poke', '0');
            }, 500);
        }
    
        // Función de limpieza
        return () => {
            clearTimeout(timeoutId);
            // document.documentElement.style.setProperty('--opacity', '0');
        };
    }, [view]);

    const handleCloseSearch = ()=>{
        dispatch(removeSearchPokemon());
    }

    const lista = (nPokemons.map((poke) => (
        <Card
            key={poke.id}
            id={poke.id}
            image={poke.image}
            name={poke.name}
            type={poke.type}
        />
        )))

    const prev = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const next = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1);
    }
    const handleOrder = (e) =>{
        setCurrentPage(1)
        switch (e.target.value) {
            case 'ascen':
                dispatch(orderAscendente())
                break;
            case 'desc':
                dispatch(orderDescendente())
                break;
            case 'ascenAtack':
                dispatch(orderAscendenteAtack())
                break;
            case 'descAtack':
                dispatch(orderDescendenteAtack())
                break;
            default:
                break;
        }
    }
    const handleFilter = (e) => {
        setCurrentPage(1)
        switch (e.target.value) {
            case 'all':
                dispatch(filterAll())
                break;
            case 'db':
                dispatch(filterDB())
                break;
            case 'api':
                dispatch(filterApi())
                break;
            case 'tipos':
                setType(true)
            default:
                break;
        }
    }
    const handleType = (e) =>{
        setCurrentPage(1)
        dispatch(filterType(e.target.value))

    }
    const handleAddDetail = () => {
        dispatch(addDetail(viewPokemon.id))
      }

        return(
            <div className={styles.container}>
                
                <div className={styles.selectCard}>
                    <div className={styles.selection}>
                        <div className={styles.filter}>
                            <select  className={styles.dropdown} onChange={handleFilter} defaultValue="fixedOption">
                                <option value="fixedOption" disabled>Selecciona la ubicacion del Pokemon</option>
                                <option value="all">Todos los Pokemones</option>
                                <option value="db">Pokemones Base Datos</option>
                                <option value="api">Pokemones API</option>
                            </select>
                        </div>

                        <div className={styles.order}>
                            <select className={styles.dropdown} onChange={handleOrder} defaultValue="fixedOption">
                                <option value="fixedOption" disabled>Selecciona el ordenamiento</option>
                                <option value="desc"> Descendente alfabeticamente</option>
                                <option value="ascen"> Ascendente alfabeticamente</option>
                                <option value="descAtack"> Descendente por ataque</option>
                                <option value="ascenAtack"> Ascendente por ataque</option>
                            </select>
                        </div>

                        <div className={styles.type}>
                            <select className={`${styles.dropdown} ${styles.view}`} defaultValue="fixedOption" onChange={handleType}>
                                <option value="fixedOption" disabled>Selecciona una Tipo</option>
                                <option value="normal">Normal</option>
                                <option value="fighting">Fighting</option>
                                <option value="flying">Flying</option>
                                <option value="poison">Poison</option>
                                <option value="ground">Ground</option>
                                <option value="rock">Rock</option>
                                <option value="bug">Bug</option>
                                <option value="ghost">Ghost</option>
                                <option value="steel">Steel</option>
                                <option value="fire">Fire</option>
                                <option value="water">Water</option>
                                <option value="grass">Grass</option>
                                <option value="electric">Electric</option>
                                <option value="psychic">Psychic</option>
                                <option value="ice">Ice</option>
                                <option value="dragon">Dragon</option>
                                <option value="dark">Dark</option>
                                <option value="fairy">Fairy</option>
                                <option value="unknown">Unknown</option>
                                <option value="shadow">Shadow</option>
                        </select>
                        </div>
                    </div>

                    <div className={styles.cards}>
                        {lista}
                    </div>
                    <div className={styles.containerPages}>
                    <div className={styles.pages}>
                        <div className = {styles.flechas} onClick={prev}><img src={flechaIzq} alt="flecha izquierda" /></div>
                        <div><h3>{currentPage} / {nPages}</h3></div>
                        <div className = {styles.flechas} onClick={next}><img src={flechaDer} alt=" flecha derecha" /></div>
                    </div>

                </div>
                    <div className={styles.btnFormCreate}>
                        <Link to='/formCreate' >
                            <img src={pokendex} alt="pokedex" />
                            <span>Crear un</span>
                            <span>pokemon</span>
                        </Link>
                    </div>  
                </div>

                {view && <div className={styles.searchPoke}>
                    <img src={closePo} alt="" onClick={handleCloseSearch}/>
                    <Link to='/detail' onClick={handleAddDetail}>
                        <div className={styles.containerSearch}>

                            <h2 className={styles.heading}>{viewPokemon.name}</h2>

                            <div className={styles.container2}>
                                <img src={viewPokemon.image} alt="imagen de pokemon" />
                            </div>

                            <h3 className={styles.footer}>{viewPokemon.type.join(', ')}</h3>
                        </div>
                    </Link>
                </div>}
                    
            </div>
        )
    }
    export default Cards;