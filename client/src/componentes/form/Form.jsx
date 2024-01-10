import { useState, useEffect } from "react";
import { validation } from "../../validation/validation";
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addView } from "../../redux/viewLogin";

function Form({login, handleRegister}){
    let view = useSelector( state => state.view.view);
    const dispatch = useDispatch();
    const [useData, setUseData] = useState({
        email:'',
        password:''
     });
    const [errors, setError] = useState({});
    const [showLogin, setShowLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>{
        setError(validation({...useData,[e.target.name]:e.target.value}))
        setUseData({...useData, [e.target.name]: e.target.value})  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(useData)
    }

    const handleShowLogin = () => {
        dispatch(addView(!view))
        setShowLogin(!showLogin)
    }
    const visible = '../../../public/visible.png';
    const invisible = '../../../public/invisible.png';
    const iconMail = '../../public/email.png';
    const logo = '../../public/logoPoke.png'
    const cha = '../../public/char.png';
    const squ = '../../public/squ.png';
    const bul = '../../public/bul.png';
    
    const handlePass = () => {
        setShowPassword(!showPassword)
    }
    
    useEffect(() => {
    
        const timeoutId = setTimeout(() => {
          // Configuración después de 1000 milisegundos (1 segundo)
          document.documentElement.style.setProperty('--opacity1', '1');
        }, 500);
      
        // La función de limpieza, se ejecutará cuando el componente se desmonte
        return () => {
          clearTimeout(timeoutId);
          document.documentElement.style.setProperty('--opacity1', '0');
        };
      }, []);

    return (
       view ? 
       (<div className = {styles.container}>
            <div className={styles.btnDiv2}><button className={styles.btn} onClick={handleShowLogin}> Sign in </button></div>

           <h1>Sign in</h1>
           <form onSubmit={handleSubmit} className={styles.formContainer}>

                <div className={styles.inputForm}> 

                    <div className={styles.formIcons}>
                        <img src={iconMail} alt="email" />
                    </div>  
                    
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        value={useData.email}
                        onChange={handleChange}
                        placeholder="Tu email"
                    />
                </div>

                <div className={styles.spanError}>
                    <span>{errors.email}</span> 
                </div>

                <div className={styles.inputForm}>
                    <div className={styles.formIcons}>
                        <img src={showPassword ? visible : invisible} alt="visible" onClick={()=>handlePass()}/>
                    </div>
                    <input 
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={useData.password}
                    onChange={handleChange}
                    placeholder="tu password"
                    />  
                </div>

                <div className={styles.spanError}>
                    <span>{errors.password}</span>
                </div>
                <div>
                    <button className={styles.btn}>go!</button>
                </div>
                </form>
                <p>¿No tienes una cuenta?<span onClick={()=>{handleRegister()}}> Crea una</span> .</p>
                <div className={styles.image1}>
                    <img src={logo} alt="" />
                </div>
        </div>)
        : (
        <div className={styles.container2}>
            <div className={styles.btnDiv}><button className={styles.btn} onClick={handleShowLogin}> Sign in </button></div>
            <div className={styles.containerWelcome}>
                <div className={styles.welcome}>
                    <h1>Bienvenido a tu Pokedex Virtual</h1>
                    <p>¡Explora el emocionante mundo de los Pokémon!</p>
                    <p>Descubre información detallada, tipos, habilidades y más sobre tus Pokémon favoritos.</p>
                    <p>¡Esperamos que disfrutes de tu viaje en esta increíble aventura Pokémon!</p>
                </div>
                <div className={styles.imagePoke}>
                    <img src={bul} alt="" />
                    <img src={cha} alt="" />
                    <img src={squ} alt="" />
                </div>
            </div>
            <div className={styles.image}>
                <img src={logo} alt="" />
            </div>
            
        </div>)

    )
}
export default Form;