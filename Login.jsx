import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4300/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          setMessage('Login Successful!');
          setIsError(false);
          setTimeout(() => {
            setMessage('');
            navigate('/home');
          }, 5000); 
        } else {
          setMessage('Something went wrong, please correct your email or password.');
          setIsError(true);
          setTimeout(() => {
            setMessage('');
          }, 5000); 
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('Something went wrong, please try again.');
        setIsError(true);
        setTimeout(() => {
          setMessage('');
        }, 5000); 
      });
  };

  return (
    <div className="container mt-3 log-background" style={{ backgroundColor: '#F8F9FA', width: '500px', height: '500px', borderRadius: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="pt-5  text-center" style={{color:'black', fontWeight:'700'}}>Login Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label htmlFor="email" className="form-label" style={{color:'black'}}>Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-5">
              <label htmlFor="password" className="form-label" style={{color:'black'}}>Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className='mt-3'>Don't have an account? <Link to="/register">Signup here</Link></p>
          {message && (
            <div className={`popup ${isError ? 'error' : 'success'}`}>
              <p>{message}</p>
              <button onClick={() => setMessage('')} className="btn btn-secondary">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
