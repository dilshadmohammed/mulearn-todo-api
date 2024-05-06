import { FormEvent, useState } from 'react';
import Moon from '../components/Moon';
import Sun from '../components/Sun';
import axios from '../axios/axios';

interface ThemeState {
    darkTheme: boolean;
    setDarkTheme: (value: boolean) => void;
}

function Signup({ darkTheme, setDarkTheme }: ThemeState) {
    const [signUp, setSignUp] = useState(false);
    const [userName, setUserName] = useState('');
    const [passwd, setPasswd] = useState('');
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [err,setErr] = useState(false)

    const signInHandler = () => {
        axios.post('/api/user/login', {
            username: userName,
            password: passwd
        }).then((response)=>{
            if(response.data){
                localStorage.setItem('access_token',response.data.access_token)
                localStorage.setItem('signedIn',JSON.stringify(true))
                window.location.reload()
            }
            else {
                throw new Error('Error in Login');
            }
        }).catch((e:Error) => {
            console.error(e.message)
        })
      };
    const signUpHandler = () => {
        axios.post('/api/user/signup', {
            username: userName,
            password: passwd,
            first_name: firstName,
            last_name: lastName
        }).then((response)=>{
            console.log(response)
        })
        console.log("signedup user")
        setSignUp(false)
      };

      const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
                if(signUp)
                    signUpHandler()
                else
                    signInHandler()

      }

    return (
        <div className='h-fit p-5'>
            <main className='w-[540px] mx-auto mt-32' >
                <br /><br /><br />
                <div className='flex justify-between items-center mb-11' >
                    <h1 className='text-white text-6xl tracking-[1.2rem]'>{signUp ? "SIGN UP" : "SIGN IN"}</h1>
                    <div onClick={() => { setDarkTheme(!darkTheme) }} className="w-8 h-8 cursor-pointer">
                        {darkTheme ? <Moon /> : <Sun />}
                    </div>
                </div>
                <form  onSubmit={handleSubmit} >
                <div className='flex flex-col mb-5 rounded-md ' >

                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-white dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='text'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        title='username'
                        placeholder='username'
                    />
                    <br />
                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-gray-400 dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='password'
                        value={passwd}
                        onChange={e => setPasswd(e.target.value)}
                        title='password'
                        placeholder='password'
                    />
                    <br />
                    
                {signUp && (
                    <>
                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-white dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        title='first_name'
                        placeholder='first_name'
                        />
                    <br />
                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-white dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        title='last_name'
                        placeholder='last_name'
                        />
                    <br />
                    </>
                   ) }
                </div>
                <div className='bg-#ffffff dark:bg-20242a rounded-md shadow-lg' style={{ 'backgroundColor': `${darkTheme ? '#20242a' : 'white'}` }}>

                </div>
                <button type='submit' className='text-center w-full bg-bright-blue hover:opacity-90 rounded-lg p-2 mt-10 mb-10 mx-auto text-primary-txt dark:text-dark-primary-txt'>
                    {signUp ? "Sign Up" : "Sign In"}
                </button>
                </form>
                <small className='mx-auto' style={{color:'red'}}>{err && "Invalid username or password"}</small>
                
                <div className='flex justify-center' onClick={() =>{ setSignUp(!signUp); setErr(false)}}>
                    <small>
                        {signUp ? (
                            <span>
                                Already have an account?{" "}
                                <span className="underline cursor-pointer">
                                    SignIn
                                </span>
                            </span>
                        ) : (
                            <span>
                                Dont have an account?{" "}
                                <span className="underline cursor-pointer">
                                    SignUp
                                </span>
                            </span>
                        )}
                    </small>
                </div>
            </main>
        </div>
    )
}

export default Signup;
