import { useState, useEffect } from "react";
import { validation } from "../../validation/validation";
import styles from './register.module.css';

function Register({handleRegister, checkIn}){

    const [useData, setUseData] = useState({
        email:'',
        user:'',
        password:'',
        confirmPassword: ''
     });
    const [errors, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) =>{
        setError(validation({...useData,[e.target.name]:e.target.value}))
        setUseData({...useData, [e.target.name]: e.target.value})  
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        checkIn(useData);
    }
    const invisible = '../../../public/invisible.png';
    const visible = '../../../public/visible.png';
    const iconMail = '../../public/email.png';
    const iconUser = '../../../public/usuario.png';

    const handlePass = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        // Configuración inicial
        document.documentElement.style.setProperty('--before-transform', 'translate(100%, -70%)');
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
          document.documentElement.style.setProperty('--opacity', '0');
        };
      }, []);

      
    return (

        <div className={styles.container}>

            <h1>Sign up</h1>

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
                            <img src={iconUser} alt="user" />
                        </div>  
                        
                        <input 
                            type="text"
                            id='user'
                            name='user'
                            value={useData.user}
                            onChange={handleChange}
                            placeholder="Tu usuario"
                            /> 
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.user}</span> 
                    </div>

                    <div className={styles.inputForm}> 
                        
                        <div className={styles.formIcons}>
                            <img src={showPassword ? visible : invisible} alt="password" onClick={()=>handlePass()}/>
                        </div>  
                        
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={useData.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
                            />
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.user}</span> 
                    </div>

                    <div className={styles.inputForm}> 
                        
                        <div className={styles.formIcons}>
                            <img src={showPassword ? visible : invisible} alt="confirmPassword" onClick={()=>handlePass()}/>
                        </div>  
                        
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={useData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirme contraseña"
                            />  
                    </div>

                    <div className={styles.spanError}>
                        <span>{errors.user}</span> 
                    </div> 

                    <div>
                        <button className={styles.btn}>go!</button>
                    </div>

                </form>
                <p>Ya tienes tu cuenta? <span onClick={()=>{handleRegister()}}> Ingresa aqui</span> .</p>
        </div>

        
    )
}
export default Register;