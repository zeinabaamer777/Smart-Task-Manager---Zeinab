import { Modal, Button } from "react-bootstrap";

export default function DeleteTaskModal({
  show,
  onCancel,
  onConfirm,
}: {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete this task?</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
