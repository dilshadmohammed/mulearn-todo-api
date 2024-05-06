import { useEffect, useState } from 'react';
import './App.css';
import TodoHome from './pages/TodoHome';
import Signup from './pages/Signup';

function App() {
  const [darkTheme, setDarkTheme] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme ? JSON.parse(theme) : false;
  });
  const [signedIn] = useState(() => {
    const savedSignedIn = localStorage.getItem('signedIn');
    return savedSignedIn ? JSON.parse(savedSignedIn) : false;
  });

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme',JSON.stringify(true))
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme',JSON.stringify(false))
    }
  }, [darkTheme]);


  return (
    <>
      {signedIn ? (
        <TodoHome darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      ) : (
        <Signup
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
        />
      )}
    </>
  );
}

export default App;
