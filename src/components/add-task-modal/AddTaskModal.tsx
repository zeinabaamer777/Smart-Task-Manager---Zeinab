import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useGetUsersQuery } from "../../features/users/usersApi";
import { useAppDispatch } from "../../hooks";
import {
  addTask,
  editTask,
  type Task,
  type TaskStatus,
} from "../../features/tasks/tasksSlice";
import { useEffect } from "react";

type AddTaskForm = {
  title: string;
  status: TaskStatus;
  userId: string;
};

export default function AddTaskModal({
  show,
  onClose,
  task,
}: {
  show: boolean;
  onClose: () => void;
  task?: Task | null;
}) {
  const { register, handleSubmit, reset } = useForm<AddTaskForm>();
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        status: task.status,
        userId: String(task.userId),
      });
    } else {
      reset({
        title: "",
        status: "" as TaskStatus,
        userId: "",
      });
    }
  }, [task, reset]);

  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);
  const dispatch = useAppDispatch();

  const onSubmit = (data: AddTaskForm) => {
    if (task && task.id) {
      dispatch(
        editTask({
          id: task.id,
          title: data.title,
          status: data.status,
          userId: Number(data.userId),
        }),
      );
    } else {
      dispatch(
        addTask({
          id: crypto.randomUUID(),
          title: data.title,
          status: data.status,
          userId: Number(data.userId),
        }),
      );
    }

    reset();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addTaskForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              {...register("title", { required: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select {...register("status", { required: true })}>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignee</Form.Label>
            <Form.Select {...register("userId", { required: true })}>
              <option value="">Select User to Assign</option>
              {isLoading && <option disabled>Loading users...</option>}
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="addTaskForm">
          {task ? "Save Changes" : "Create Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
