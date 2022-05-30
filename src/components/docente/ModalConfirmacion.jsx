import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function ModalConfirmacion({
  modalVisible,
  texto,
  accionAceptar,
  accionCancelar,
}) {
  return (
    <Modal show={modalVisible} onHide={accionCancelar}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar</Modal.Title>
      </Modal.Header>
      <Modal.Body>{texto}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={accionCancelar}>
          No
        </Button>
        <Button variant="primary" onClick={accionAceptar}>
          Sí
        </Button>
      </Modal.Footer>
    </Modal>
  );
}