import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Card, Form, Table, Modal, Alert } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import ClienteList from './components/ClienteList';
import ProveedorList from './components/ProveedorList';
import FacturaList from './components/FacturaList';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
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
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/proveedores">Proveedores</Nav.Link>
                <Nav.Link as={Link} to="/facturas">Facturas</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
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
          <Route
            path="/facturas"
            element={
              <PrivateRoute>
                <FacturaList />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

