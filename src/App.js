import React, { useEffect, useState } from 'react';
import './App.css';

const {
  REACT_APP_COGNITO_URL,
  REACT_APP_COGNITO_CLIENT_ID,
  REACT_APP_COGNITO_REDIRECT_URI
} = process.env;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');

    setIsLoggedIn(!!credentials);

    if (credentials) {
      const parsedCredentials = JSON.parse(credentials);
      setCredentials(parsedCredentials);
    }
  }, [setIsLoggedIn]);

  const signOut = () => {
    localStorage.removeItem('credentials');
    setIsLoggedIn(false);
    setCredentials(null);
  };

  return (
    <div className="App">
      <header className="App-header">Cognito Demo</header>
      {isLoggedIn ? (
        <>
          <p>User is logged in</p>
          <button onClick={signOut}>Sign out</button>

          <p>Access token</p>
          <p>{credentials.access_token}</p>

          <p>Identity token</p>
          <p>{credentials.id_token}</p>

          <p>Refresh token</p>
          <p>{credentials.refresh_token}</p>
        </>
      ) : (
        <a href={`${REACT_APP_COGNITO_URL}/login?client_id=${REACT_APP_COGNITO_CLIENT_ID}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${REACT_APP_COGNITO_REDIRECT_URI}`}>Sign in</a>
      )}
    </div>
  );
}

export default App;
