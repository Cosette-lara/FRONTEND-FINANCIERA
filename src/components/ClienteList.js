import React, { useState, useEffect } from 'react';
      import axiosInstance from '../utils/api';
      import { Container, Card } from 'react-bootstrap';
      
      function ClienteList() {
        const [clientes, setClientes] = useState([]);
        
        useEffect(() => {
          const fetchClientes = async () => {
            try {
              const response = await axiosInstance.get(`/clientes/`);
              setClientes(response.data);
            } catch (error) {
              console.error("Error fetching clientes", error);
            }
          };
          
          fetchClientes();
        }, []);
        
        return (
          <Container className="mt-5">
            <h2 className="text-center">Clientes</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {clientes.map(cliente => (
                <Card key={cliente.id} className="m-3 p-3 shadow" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{cliente.nombre}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Container>
        );
      }
      
      export default ClienteList;