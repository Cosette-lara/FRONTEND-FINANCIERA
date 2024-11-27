import React, { useState, useEffect } from 'react';
      import axiosInstance from '../utils/api';
      import { Container, Card } from 'react-bootstrap';
      
      function ProveedorList() {
        const [proveedores, setProveedores] = useState([]);
        
        useEffect(() => {
          const fetchProveedores = async () => {
            try {
              const response = await axiosInstance.get(`/proveedores/`);
              setProveedores(response.data);
            } catch (error) {
              console.error("Error fetching proveedores", error);
            }
          };
          
          fetchProveedores();
        }, []);
        
        return (
          <Container className="mt-5">
            <h2 className="text-center">Proveedores</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {proveedores.map(proveedor => (
                <Card key={proveedor.id} className="m-3 p-3 shadow" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{proveedor.nombre}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Container>
        );
      }
      
      export default ProveedorList;