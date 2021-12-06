import {Task} from "src/interfaces/Task";
import { Card } from 'semantic-ui-react'
import { useRouter } from 'next/router'

interface PropsTypes {
  tasks: Task[]
}

export default function TaskList({tasks}: PropsTypes):JSX.Element{
  const router = useRouter()
  return (
    <Card.Group itemsPerRow={4}>
      {
        tasks.length > 0 && tasks.map(task => (
      <Card 
        key={task.id} 
        onClick={()=>router.push(`/tasks/edit/${task.id}`)}
      >
            <Card.Content>
              <Card.Header>
                {task.title}
              </Card.Header>
              <Card.Meta>
                {
                  task.created_on && (
                    new Date(task.created_on).toLocaleDateString()
                  )
                }
              </Card.Meta>
              <Card.Description>
                {task.description}
              </Card.Description>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  )
}
