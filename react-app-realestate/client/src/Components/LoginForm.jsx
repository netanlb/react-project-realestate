import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';

const LoginForm = ({ closeModal, loginUser, setAlert }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [massage, setMassage] = useState('');

  const userLogin = () => {
    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          setAlert('Login succesfull!', 'success');
          res.json()
            .then((json) => {
              loginUser(json.user.name, json.token);
            })
            .then(() => closeModal());
        } else {
          res.json().then((json) => setMassage(json.msg));
        }
      });
  };

  return (
    <div
      className="container mx-auto img-fluid rounded"
      style={{
        maxWidth: '30em',
        marginTop: '5em',
        backgroundColor: '#eeeeee',
      }}
    >
      <button type="button" className="close" aria-label="Close" onClick={() => closeModal()} style={{ position: 'relative', left: '0.4em' }}>
        <span aria-hidden="true">&times;</span>
      </button>
      <Form style={{ padding: 30 }}>
        <h2>Please Login</h2>
        <CSSTransition
          in={massage}
          timeout={300}
          classNames="col"
        >
          <div>
            {massage
            && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {massage}
              </div>
            )}
          </div>
        </CSSTransition>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" valie={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={userLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
