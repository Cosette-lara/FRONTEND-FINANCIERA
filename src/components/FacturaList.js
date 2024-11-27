import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/api';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

function FacturaList() {
  const [facturas, setFacturas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [formValues, setFormValues] = useState({
    numero_factura: '',
    cliente: '',
    fecha_emision: '',
    fecha_vencimiento: '',
    monto_total: '',
    estado: 'Pendiente',
  });

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = async () => {
    try {
      const response = await axiosInstance.get('/facturas/');
      setFacturas(response.data);
    } catch (error) {
      console.error('Error fetching facturas', error);
    }
  };

  const handleAddClick = () => {
    setSelectedFactura(null);
    setFormValues({
      numero_factura: '',
      cliente: '',
      fecha_emision: '',
      fecha_vencimiento: '',
      monto_total: '',
      estado: 'Pendiente',
    });
    setShowModal(true);
  };

  const handleEditClick = (factura) => {
    setSelectedFactura(factura);
    setFormValues(factura);
    setShowModal(true);
  };

  const handleDeleteClick = async (facturaId) => {
    try {
      await axiosInstance.delete(`/facturas/${facturaId}/`);
      fetchFacturas(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting factura', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFactura) {
        // Update existing factura
        await axiosInstance.put(`/facturas/${selectedFactura.id}/`, formValues);
      } else {
        // Create new factura
        await axiosInstance.post('/facturas/', formValues);
      }
      fetchFacturas(); // Refresh the list after saving
      setShowModal(false);
    } catch (error) {
      console.error('Error saving factura', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Facturas</h2>
      <Button onClick={handleAddClick} variant="primary" className="mb-3">
        Añadir Factura
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número de Factura</th>
            <th>Cliente</th>
            <th>Fecha de Emisión</th>
            <th>Fecha de Vencimiento</th>
            <th>Monto Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.numero_factura}</td>
              <td>{factura.cliente}</td>
              <td>{factura.fecha_emision}</td>
              <td>{factura.fecha_vencimiento}</td>
              <td>{factura.monto_total}</td>
              <td>{factura.estado}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(factura)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(factura.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Facturas */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedFactura ? 'Editar Factura' : 'Añadir Factura'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="numero_factura">
              <Form.Label>Número de Factura</Form.Label>
              <Form.Control
                type="text"
                name="numero_factura"
                value={formValues.numero_factura}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cliente" className="mt-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name="cliente"
                value={formValues.cliente}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="fecha_emision" className="mt-3">
              <Form.Label>Fecha de Emisión</Form.Label>
              <Form.Control
                type="date"
                name="fecha_emision"
                value={formValues.fecha_emision}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="fecha_vencimiento" className="mt-3">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="date"
                name="fecha_vencimiento"
                value={formValues.fecha_vencimiento}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="monto_total" className="mt-3">
              <Form.Label>Monto Total</Form.Label>
              <Form.Control
                type="number"
                name="monto_total"
                value={formValues.monto_total}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="estado" className="mt-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="estado"
                value={formValues.estado}
                onChange={handleFormChange}
              >
                <option>Pendiente</option>
                <option>Pagada</option>
                <option>Vencida</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              {selectedFactura ? 'Guardar Cambios' : 'Añadir Factura'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default FacturaList;

