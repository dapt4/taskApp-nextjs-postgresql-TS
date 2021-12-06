import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Button, Card, Form, Icon, Grid, Confirm } from "semantic-ui-react";
import { Task } from "src/interfaces/Task";
import { useRouter } from "next/router";
import Layout from "src/components/Layout";

export default function NewPage() {
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [name]: value });
  };
  const createTask = async (tsk: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tsk),
    });
  };

  const updateTask = async (id: string, task: Task) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        await createTask(task);
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ title: task.title, description: task.description });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="write your title"
                    name="title"
                    value={task.title}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    name="description"
                    rows={2}
                    onChange={handleChange}
                    placeholder="Write a description"
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal">
                    <Icon name="save" />
                    update
                  </Button>
                ) : (
                  <Button primary>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>
          {router.query.id && (
            <Button color="red" onClick={() => setOpenConfirm(true)}>
              Delete
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Confirm
        header="Delet a task"
        content={`Are you sure yo want to delete this task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
          }
      />
    </Layout>
  );
}
