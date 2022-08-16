import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const {
  REACT_APP_COGNITO_URL,
  REACT_APP_COGNITO_CLIENT_ID,
  REACT_APP_COGNITO_CLIENT_SECRET,
  REACT_APP_COGNITO_REDIRECT_URI
} = process.env;

function Callback() {
  const [searchParams] = useSearchParams();
  const [credentials, setCredentials] = useState();

  useEffect(() => {
    (async () => {
      var params = new URLSearchParams();

      params.append('grant_type', 'authorization_code');
      params.append('client_id', REACT_APP_COGNITO_CLIENT_ID);
      params.append('code', searchParams.get('code'));
      params.append('redirect_uri', REACT_APP_COGNITO_REDIRECT_URI);

      const { data: credentials } = await axios.post(`${REACT_APP_COGNITO_URL}/oauth2/token`, params, {
        auth: {
          username: REACT_APP_COGNITO_CLIENT_ID,
          password: REACT_APP_COGNITO_CLIENT_SECRET
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      console.log('Credentials', credentials);

      localStorage.setItem('credentials', JSON.stringify(credentials));
      setCredentials(credentials);
    })();
  }, [searchParams]);

  return credentials ? <Navigate to="/" /> : null;
}

export default Callback;
