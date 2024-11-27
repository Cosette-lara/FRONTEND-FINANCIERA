import React, { useState, useEffect } from 'react';
      import axiosInstance from '../utils/api';
      import { Container, Card } from 'react-bootstrap';
      import Chart from 'react-apexcharts';
      
      function Dashboard() {
        const [totalPorCobrar, setTotalPorCobrar] = useState(0);
        const [totalPorPagar, setTotalPorPagar] = useState(0);
        const [facturasVencidas, setFacturasVencidas] = useState(0);
        const [chartData, setChartData] = useState({
          options: {
            chart: {
              id: 'cash-flow-chart'
            },
            xaxis: {
              categories: []
            }
          },
          series: [{
            name: 'Montos por mes',
            data: []
          }]
        });
        
        useEffect(() => {
          const fetchMetrics = async () => {
            try {
              const response = await axiosInstance.get('/dashboard/metrics/');
              setTotalPorCobrar(response.data.total_por_cobrar);
              setTotalPorPagar(response.data.total_por_pagar);
              setFacturasVencidas(response.data.facturas_vencidas);
              setChartData({
                ...chartData,
                options: {
                  ...chartData.options,
                  xaxis: {
                    categories: response.data.meses
                  }
                },
                series: [{
                  name: 'Montos por mes',
                  data: response.data.montos_por_mes
                }]
              });
            } catch (error) {
              console.error("Error fetching dashboard metrics", error);
            }
          };
          
          fetchMetrics();
        }, []);
        
        return (
          <Container className="mt-5">
            <h2 className="text-center">Dashboard Contable</h2>
            <div className="d-flex flex-wrap justify-content-between">
              <Card className="m-3 p-3 shadow" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Total por Cobrar</Card.Title>
                  <Card.Text>${totalPorCobrar}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="m-3 p-3 shadow" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Total por Pagar</Card.Title>
                  <Card.Text>${totalPorPagar}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="m-3 p-3 shadow" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Facturas Vencidas</Card.Title>
                  <Card.Text>{facturasVencidas}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="mt-5">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="100%"
              />
            </div>
          </Container>
        );
      }
      
      export default Dashboard;