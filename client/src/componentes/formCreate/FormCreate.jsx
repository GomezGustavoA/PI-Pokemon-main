import React, {  useState, useEffect } from "react";
import styles from './formCreate.module.css'
import axios from 'axios';
import { validationFormCreate } from "../../validation/validationFormCreate";
import { useSelector } from "react-redux";


export default function FormCreate() {
  const types = useSelector(state => state.types.pokemon);
  const [error, setError] = useState({});
  const [createData, setCreateData] = useState({
    name: "",
    image: "", // imagen de internet
    hp: 0, // rango 0 250
    attack: 0, // rango 0 200
    defense: 0, // rango 0 250
    speed: 0, // rango 0 200
    height: 0, // rango 0 200
    weight: 0, // rango 0 4000
    types: [], // Permitir selección de hasta 3 tipos
  });

  useEffect(() => {
    // Configuración inicial
    document.documentElement.style.setProperty('--before-transform', 'translateY(-50%)');
    document.documentElement.style.setProperty('--before-right', '40%');

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
      // document.documentElement.style.setProperty('--opacity', '0');
    };
  }, []);

  const handleFormCreate = async(e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(`http://localhost:3001/pokemons`, createData);

      setCreateData({
          name: "",
          image: "",
          hp: 0,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 0,
          weight: 0,
          types: [],
        });

  } catch (error) {
      console.log(error)
  }

  }



  const handleCheckboxChange = (e) => {
    const { value } = e.target;
  
    // Copiar el array existente para evitar mutaciones directas
    const selectedTypes = [...createData.types];
  
    if (selectedTypes.includes(value)) {
      // Si ya está seleccionado, quitarlo
      const index = selectedTypes.indexOf(value);
      selectedTypes.splice(index, 1);
    } else {
      // Si no está seleccionado, agregarlo si no excede el límite de 3
      if (selectedTypes.length < 3) {
        selectedTypes.push(value);
      }
    }
  
    setCreateData((prevData) => ({
      ...prevData,
      types: selectedTypes,
    }));
  };
console.log(createData.types)

  const handleChange = (e) =>{
    const errorNameImage = ['name','image'];
    const numericProperties = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
    let number = null;
    
    if (numericProperties.includes(e.target.name)) {
        number = Number(e.target.value);
    }
    if(errorNameImage.includes(e.target.name)){
      setError(validationFormCreate({...createData,[e.target.name]:e.target.value}))
    }
    setCreateData({...createData, [e.target.name]: number === null ? e.target.value : number})  
}

const iconMail = '../../public/email.png';

let checkboxTypes = types.map((type) => {
  console.log('Rendering checkbox for type:', type);
  return (
      <div className={styles.checkType} key={type.num}>
          <div className={styles.attribute}>
              <h2>{type.name}</h2>
          </div>
          <div className={styles.checkTypeInput}>
              <input
                  type="checkbox"
                  name="types"
                  value={type.num}
                  checked={createData.types.includes(type.num.toString())}
                  onChange={handleCheckboxChange}
              />
          </div>
      </div>
  );
});

  return (


    <div className={styles.container}>
      
      <form onSubmit={handleFormCreate}  className={styles.formContainer}>

          <div className={styles.formContainer1}>
              
            <div className={styles.inputForm}>
              <div className={styles.formIcons}>
                  <img src={iconMail} alt="nombre" />
              </div> 
              <input
                type="text"
                name="name"
                value={createData.name}
                onChange={handleChange}
                placeholder="nombre de tu pokemon"
              />
            </div>

            <div className={styles.spanError}>
                <span>{error.name}</span> 
            </div>

            <div className={styles.inputForm}>

              <div className={styles.formIcons}>
                  <img src={iconMail} alt="nombre" />
              </div> 

              <input
                type="text"
                name="image"
                value={createData.image}
                onChange={handleChange}
                placeholder="Image URL"
              />

            </div>

            <div className={styles.spanError}>
                <span>{error.image}</span> 
            </div>

            <div className={styles.containerRangos}>

                <div className={styles.inputFormRangos}>
                
                    <div className={styles.attribute}>
                          <h2>HP</h2>
                    </div> 

                    <div className={styles.inputRango}>
                        <input
                          type="range"
                          name="hp"
                          min={0}
                          max={250}
                          value={createData.hp}
                          onChange={handleChange}
                        />
                    </div>

                    <div className={styles.counter}>
                      {createData.hp}
                    </div>
                  
                </div>

                <div className={styles.inputFormRangos}>
                  
                    <div className={styles.attribute}>
                          <h2>Attack</h2>
                    </div> 

                    <div className={styles.inputRango}>
                        <input
                          type="range"
                          name="attack"
                          min={0}
                          max={200}
                          value={createData.attack}
                          onChange={handleChange}
                        />
                    </div>

                  <div className={styles.counter}>
                    {createData.attack}
                  </div>

                </div>

          </div>

          <div className={styles.containerRangos}>

            <div className={styles.inputFormRangos}>
              
              <div className={styles.attribute}>
                    <h2>Defense</h2>
              </div>

              <div className={styles.inputRango}>
                <input
                  type="range"
                  name="defense"
                  min={0}
                  max={250}
                  value={createData.defense}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.counter}>
                {createData.defense}
              </div>

            </div>

            <div className={styles.inputFormRangos}>
              
              <div className={styles.attribute}>
                    <h2>Speed</h2>
              </div>

              <div className={styles.inputRango}>
                <input
                  type="range"
                  name="speed"
                  min={0}
                  max={200}
                  value={createData.speed}
                  onChange={handleChange}
                />
              </div> 

              <div className={styles.counter}>
                {createData.speed}
              </div>

            </div>
          </div>

          <div className={styles.containerRangos}>

            <div className={styles.inputFormRangos}>
            
              <div className={styles.attribute}>
                    <h2>Height</h2>
              </div>

              <div className={styles.inputRango}>
                <input
                  type="range"
                  name="height"
                  min={0}
                  max={200}
                  value={createData.height}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.counter}>
                {createData.height}
              </div>

            </div>

              <div className={styles.inputFormRangos}>
                {/* <label>Weight:</label> */}
                <div className={styles.attribute}>
                      <h2>Weight</h2>
                </div>

                <div className={styles.inputRango}>
                  <input
                    type="range"
                    name="weight"
                    min={0}
                    max={4000}
                    value={createData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.counter}>
                  {createData.weight}
                </div>

            </div>
          </div>
          </div>
        <div className={styles.types1}>

          <div className={styles.inputFormTypes}>
              <div className={styles.attribute}>
                      <h2>Types</h2>
              </div>
          

              <div className={styles.checkboxContainer}>

                {checkboxTypes}

              </div>

          </div>

        </div>

        {/* {createData.name !== "" && createData.image !== "" 
          ?
            <div >
              <button className={styles.btn}>
                  create pokemon
              </button>
            </div>
            :
            null
          } */}
      

      </form>
    </div>
  );
}