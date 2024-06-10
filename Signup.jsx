import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4300/register', { name, email, password })
      .then(result => {
        console.log(result);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/login');
        }, 5000); 
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container p-5 mt-3  login-background" style={{ backgroundColor: '#F8F9FA', width: '400px', height: '700px', borderRadius: '20px' }}>
      <div className="row">
        <div className="col-12 text-center pt-4">
          <div style={{fontSize:'35px', fontWeight:'700'}}>
            <p>Sign Up</p>
          </div>
          <img
            src="\Facebook_logo.png" // Replace with the actual URL of the Instagram logo
            alt="Facebook Logo"
            style={{ width: '100px', height: '100px' }}
          />

          <h1 className="pt-3" style={{ color: '#2874f0' }}>facebook</h1>
          
        </div>

        <div className="col-12">
          <div className="App">
            <header className="pt-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: 'black' }}>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: 'black' }}>Email:</label>
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: 'black' }}>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div style={{ textAlign: 'center', }}>
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
              <div style={{ textAlign: 'center' }}>
              <p className="pt-4" style={{ textAlign: 'center', color: 'black' }}>Already have an account?<Link to="/login" className="btn btn-link">Login</Link></p>
              
                
              </div>
            </header>
            {showPopup && (
              <div className="popup">
                <p>Registration Successful!</p>
                <button onClick={() => setShowPopup(false)} className="btn btn-success">Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
