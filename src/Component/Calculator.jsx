import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calculator.css';
import { FaWhatsapp, FaHistory, FaLightbulb, FaPercentage } from 'react-icons/fa';

const Calculator = () => {
  const [values, setValues] = useState({
    percentage: '',
    amount: '',
    result1: '00.00',
    x: '',
    y: '',
    result2: '00.00',
    origin: '',
    newValue: '',
    result3: '00.00'
  });

  const [history, setHistory] = useState([]);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  const tips = [
    "Tip: To calculate a 20% tip, multiply the amount by 0.20",
    "Tip: Percentage increase = (New - Original)/Original × 100",
    "Tip: X% of Y is the same as Y% of X",
    "Tip: To find original value after increase: Final/(1 + Percentage/100)"
  ];

  // Auto-calculate when inputs change
  useEffect(() => {
    calculatePercentageOf();
  }, [values.percentage, values.amount]);

  useEffect(() => {
    calculateWhatPercentage();
  }, [values.x, values.y]);

  useEffect(() => {
    calculatePercentageChange();
  }, [values.origin, values.newValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const calculatePercentageOf = () => {
    if (values.percentage && values.amount) {
      const result = (values.percentage / 100) * values.amount;
      const calculation = `${values.percentage}% of ${values.amount} = ${result.toFixed(2)}`;
      addToHistory(calculation);
      setValues(prev => ({ ...prev, result1: result.toFixed(2) }));
    } else {
      setValues(prev => ({ ...prev, result1: '00.00' }));
    }
  };

  const calculateWhatPercentage = () => {
    if (values.y && values.x) {
      const result = (values.x / values.y) * 100;
      const calculation = `${values.x} is ${result.toFixed(2)}% of ${values.y}`;
      addToHistory(calculation);
      setValues(prev => ({ ...prev, result2: result.toFixed(2) }));
    } else {
      setValues(prev => ({ ...prev, result2: '00.00' }));
    }
  };

  const calculatePercentageChange = () => {
    if (values.origin && values.newValue) {
      const result = ((values.newValue - values.origin) / values.origin) * 100;
      const calculation = `${values.newValue} is ${result.toFixed(2)}% of ${values.origin} (${result > 0 ? 'increase' : 'decrease'})`;
      addToHistory(calculation);
      setValues(prev => ({ ...prev, result3: result.toFixed(2) }));
    } else {
      setValues(prev => ({ ...prev, result3: '00.00' }));
    }
  };

  const addToHistory = (calculation) => {
    setHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  const resetAll = () => {
    setValues({
      percentage: '',
      amount: '',
      result1: '00.00',
      x: '',
      y: '',
      result2: '00.00',
      origin: '',
      newValue: '',
      result3: '00.00'
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Check out these percentage calculations:
1. ${values.percentage || 'X'}% of ${values.amount || 'Y'} = ${values.result1}
2. ${values.x || 'X'} is ${values.result2}% of ${values.y || 'Y'}
3. % change from ${values.origin || 'Origin'} to ${values.newValue || 'New'} = ${values.result3}%`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const showRandomTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 5000);
  };

  return (
    <Container className="mt-5 calculator-container">
      <Card className="shadow-lg calculator-card">
        <Card.Header className="calculator-header">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-0 brand-title">
              <FaPercentage className="me-2" />
              Percentage Calculator
            </h2>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={showRandomTip}
              className="tip-button"
            >
              <FaLightbulb className="me-1" /> Tip
            </Button>
          </div>
          <div className="header-decoration"></div>
        </Card.Header>
        
        <Card.Body className="calculator-body">
          {showTip && (
            <Alert variant="info" className="tip-alert" onClose={() => setShowTip(false)} dismissible>
              {currentTip}
            </Alert>
          )}

          {/* First Calculator */}
          <Row className="mb-4 calculator-row">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="input-label">What is</Form.Label>
                <div className="d-flex align-items-center input-group-custom">
                  <Form.Control
                    type="number"
                    name="percentage"
                    value={values.percentage}
                    onChange={handleChange}
                    placeholder="X"
                    className="text-center input-field"
                  />
                  <span className="mx-2 operator-text">% of</span>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    placeholder="Y"
                    className="text-center input-field"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <div className="ms-3 result-display">
                <strong>= {values.result1}</strong>
              </div>
            </Col>
          </Row>

          {/* Second Calculator */}
          <Row className="mb-4 calculator-row">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="input-label">X is what % of Y</Form.Label>
                <div className="d-flex align-items-center input-group-custom">
                  <Form.Control
                    type="number"
                    name="x"
                    value={values.x}
                    onChange={handleChange}
                    placeholder="X"
                    className="text-center input-field me-2"
                  />
                  <span className="mx-1 operator-text">of</span>
                  <Form.Control
                    type="number"
                    name="y"
                    value={values.y}
                    onChange={handleChange}
                    placeholder="Y"
                    className="text-center input-field ms-2"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <div className="ms-3 result-display">
                <strong>= {values.result2}%</strong>
              </div>
            </Col>
          </Row>

          {/* Third Calculator */}
          <Row className="mb-4 calculator-row">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="input-label">% change from Origin to New</Form.Label>
                <div className="d-flex align-items-center input-group-custom">
                  <Form.Control
                    type="number"
                    name="origin"
                    value={values.origin}
                    onChange={handleChange}
                    placeholder="Origin"
                    className="text-center input-field me-2"
                  />
                  <span className="mx-1 operator-text">to</span>
                  <Form.Control
                    type="number"
                    name="newValue"
                    value={values.newValue}
                    onChange={handleChange}
                    placeholder="New"
                    className="text-center input-field ms-2"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <div className="ms-3 result-display">
                <strong>= {values.result3}%</strong>
              </div>
            </Col>
          </Row>

          {/* History Section */}
          {history.length > 0 && (
            <div className="history-section mb-3">
              <h6><FaHistory className="me-2" />Recent Calculations</h6>
              <ul className="history-list">
                {history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="d-flex justify-content-between mt-4 action-buttons">
            <Button 
              variant="danger" 
              className="action-button reset-button"
              onClick={resetAll}
            >
              Reset All
            </Button>
            <Button 
              variant="success" 
              className="action-button whatsapp-button"
              onClick={shareOnWhatsApp}
            >
              <FaWhatsapp className="me-2" /> Share on WhatsApp
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Calculator;