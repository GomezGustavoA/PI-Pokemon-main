import { useEffect, useState } from 'react';
import styles from './detail.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { removeDetail } from '../../redux/detail';
import { useNavigate } from 'react-router-dom';

export default function Detail (){
    const [pokemon, setPokemon] = useState({})
    const fondoDetail = './../../../public/fondoDetail.jpg';
    const fondoPincipal = './../../../public/pokemon-fondo1.webp'
    const navigate = useNavigate()
    const ID = useSelector(state=>state.detail.detailNum);

    useEffect(() => {
        // Configuración inicial
        document.documentElement.style.setProperty('--fondo-principal', `url(${fondoDetail})`);
        document.documentElement.style.setProperty('--before-transform', 'translate(95%, -60%)');
        document.documentElement.style.setProperty('--before-right', '40%');
    
        const timeoutId = setTimeout(() => {
          // Configuración después de 1000 milisegundos (1 segundo)
          document.documentElement.style.setProperty('--opacity', '1');
        }, 500);
    
        // La función de limpieza, se ejecutará cuando el componente se desmonte
        return () => {
          clearTimeout(timeoutId);
    
          // Configuración al desmontar el componente
          document.documentElement.style.setProperty('--fondo-principal', `url(${fondoPincipal})`);
          document.documentElement.style.setProperty('--before-transform', 'translateY(-50%)');
          document.documentElement.style.setProperty('--before-right', '60%');
          document.documentElement.style.setProperty('--opacity', '0');
        };
      }, []);

      useEffect(()=> {

        async function fecthData (){
    
          try {

            const {data} = await axios.get(`http://localhost:3001/pokemons/${ID}`);
            setPokemon(data.pokemon)

          } catch (error) {
            window.alert('Error en la obtencion de los Pokemons')
            console.log(error)
          }
        }
    
        fecthData();
      },[])

      console.log(pokemon)

    const handleClose = () => {
        dispatch(removeDetail());
        navigate('/home')
    }

const {attack, id, defense, height, hp, image, name, speed, weight, type} = pokemon;

return (
    <div className={styles.container}>
        <div className={styles.div1}>

            <div className={styles.name}>
              <h1>{name}</h1>
            </div>

            <div className={styles.image}>
              <img src = {image} alt="" />
            </div>
           
        </div>

        <div className={styles.div2}>

           <div className={styles.position}>  

              <div className={styles.infoDetail}>
                <h1>Detail</h1>
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>id : </h2>
                </div >
                <div className={styles.value}>
                  <div className={styles.valueText}>
                    <h2>{id}</h2>
                  </div>
                </div>
                
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>vida: </h2> 
                </div>
                <div className={styles.value}>
                  <h2>{hp}</h2>
                </div>  
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>ataque: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {attack}
                  </h2>
                </div>
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>defensa: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {defense}
                  </h2>
                </div>
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>velocidad: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {speed}
                  </h2>
                </div>
              </div>

              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>altura: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {weight}
                  </h2>
                </div>
              </div>
              
              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>peso: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {height}    
                  </h2>
                </div>
              </div>
                
              <div className={`${styles.info} ${styles.infoH2}`}>
                <div className={styles.atribute}>
                  <h2>tipo: </h2>
                </div>
                <div className={styles.value}>
                  <h2>
                    {type && type.join(', ')}                  
                  </h2>
                </div>
              </div>
            </div>
        </div>
        
    </div>
)
}