import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

function History({ history }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>Show History</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            {history.map((obj, idx) => (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>{obj.method}: {obj.url}</Accordion.Header>
                <Accordion.Body>
                  {JSON.stringify(obj.data, undefined, 2)}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default History;