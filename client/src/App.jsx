import './App.css';
import Form from './componentes/form/Form';
import Register from './componentes/form/Register';
import Nav from './componentes/nav/Nav';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './componentes/cards/Cards';
import { addPokemon } from './redux/pokemonSlice';
import { addSearchPokemon } from './redux/searchPokemon';
import { addUserName } from './redux/userName';
import { addTypes } from './redux/types';
import { useDispatch } from 'react-redux';
import { addView } from './redux/viewLogin';
import Detail from './componentes/detail/Detail';
import FormCreate from './componentes/formCreate/FormCreate';

function App() {
  const [access, setAccess] = useState(false);
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(()=> {

    async function fecthData (){

      try {
        const response = await axios.get(`http://localhost:3001/types`);
        dispatch(addTypes(response.data.results))

        const {data} = await axios.get(`http://localhost:3001/pokemons?cantPo=150`);
        dispatch(addPokemon(data));
        
      } catch (error) {
        window.alert('Error en la obtencion de los Pokemons')
        console.log(error)
      }
    }

    fecthData();
  },[])
  
  const login = async (useData)=>{
    try {
      const {data} = await axios(`http://localhost:3001/login?email=${useData.email}&password=${useData.password}`)
      const {access, logUser} = data;
      
      if(access) {
        dispatch(addUserName(logUser.user))
        console.log(logUser.user)
        setAccess(true);
        navigate('/home');

      }
    } catch (error) {
      window.alert(error.response.data.message + ', cree una cuenta')
    }
  }

  const checkIn = async (useData)=>{
    try {
      const {data} = await axios.post(`http://localhost:3001/login`, useData);
      
      if(data.access) {
        setRegister(true)
        navigate('/')
        window.alert('El usuario '+ data.userOk.user + ', se creo exitosamente.')
      }
    } catch (error) {
      window.alert(error.response.data.error + ', cree una cuenta')
    }
  }

const logout = ()=>{
  setAccess(false);
  navigate('/');
  dispatch(addView(false))
}

useEffect(() => {
  !access && navigate('/');
}, [access]);

const handleRegister = ()=>{
  setRegister(!register)
}

const onSearch = async(name) =>{
  try {
    const {data} = await axios(`http://localhost:3001/pokemons/name?name=${name}`);
    data.pokemon && dispatch(addSearchPokemon(data.pokemon));
  } catch (error) {
    console.log(error)
    window.alert(error.response.data.menssage)
  }
  
} 


let locationForm = location.pathname == '/'

  return (
    <div className='container'>
      <div className="App">
        {locationForm ? null : <Nav logout={logout} onSearch={onSearch}/>}
        <Routes>
            {!register ? <Route path='/' element={<Register checkIn={checkIn} handleRegister={handleRegister}/>}/>
            :<Route path='/' element={<Form login={login} handleRegister={handleRegister}/>}/>}

            <Route path='/formCreate' element={<FormCreate />}/>
            <Route path='/detail' element={<Detail/>}/>
            <Route path='/home' element={<Cards/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
