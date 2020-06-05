import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';

const RegisterFrom = ({ closeModal, setAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [massage, setMassage] = useState('');

  const userRegister = () => {

    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        if (res.ok) {
          setAlert('Register succesfull!', 'success');
          console.log(res);
          closeModal();
        } else (res.json().then((json) => setMassage(json.msg)));
      });
  };

  return (
    <div
      className="mx-auto img-fluid rounded overflow-auto"
      style={{
        height: '70vh',
        maxWidth: '30em',
        marginTop: '2em',
        backgroundColor: '#eeeeee',
      }}
    >
      <button type="button" className="close" aria-label="Close" onClick={() => closeModal()} style={{ position: 'relative', right: 5 }}>
        <span aria-hidden="true">&times;</span>
      </button>
      <Form style={{ padding: 30 }}>
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
        <h2>Fill the form bellow to register new user</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

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
        <Button variant="primary" type="button" onClick={userRegister}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterFrom;
