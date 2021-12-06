import { Task } from "src/interfaces/Task";
import { Grid, Button, GridRow, GridColumn } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import TaskList from "src/components/tasks/TaskList";
import Layout from 'src/components/Layout'

interface PropsType {
  tasks: Task[];
}

export default function Index({ tasks }: PropsType): JSX.Element {
  const router = useRouter()
  return(
    <Layout>
      {
        tasks.length === 0 ? 
        <Grid 
          columns={3}
          centered
          verticalAlign='middle'
          style={{height: '70%'}}>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <h1>There are not tasks yet</h1>
                  <Button
                    onClick={()=>router.push('tasks/new')}>
                    Create a Task
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        : <TaskList tasks={tasks}/>
      }
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};
