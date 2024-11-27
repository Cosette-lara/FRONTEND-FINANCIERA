import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
    import { Navbar, Nav, Container } from 'react-bootstrap';
    import LoginPage from './components/LoginPage';
    import ClienteList from './components/ClienteList';
    import ProveedorList from './components/ProveedorList';
    import PrivateRoute from './components/PrivateRoute';
    import './App.css';
    
    function App() {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
                    <Nav.Link as={Link} to="/proveedores">Proveedores</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
    
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/clientes"
                element={
                  <PrivateRoute>
                    <ClienteList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/proveedores"
                element={
                  <PrivateRoute>
                    <ProveedorList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      );
    }
    
    export default App;
