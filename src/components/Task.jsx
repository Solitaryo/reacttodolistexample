// TODO: Implement this as a component inside TodoList
import React from 'React';
import { List, ListItem } from 'material-ui/List';
import TaskStore from '../stores/TaskStore';

class Task  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      task: []
    }
  }

  componentWillMount()
  {
    TaskStore.on('TASK_SUCCESS', this.setTask);
  }

  componentWillUnmount()
  {
    TaskStore.removeListener('TASK_SUCCESS', this.setTask);
  }

  setTask = () => {
    // console.log('FROM TASK COMPONENT');
    this.setState({task: TaskStore.getTask()});
  }

  render()
  {
    const tasks = this.state.task.map((task) => {
      return <ListItem
        onTouchTap={ () => this.loadTasks(task.id)}
        rightIconButton={<IconButton> <Delete /> </IconButton>}
        leftIcon={<FormatListNumbered />}
        key={Math.random().toString()}
        primaryText={task.name} />
    });

    return (
      <GridTile
        rows={3}
        cols={2}>
          <p>Tasks</p>
          <RaisedButton label="Add new Task" primary={true} />
          <RaisedButton label="Delete Task" secondary={true} />
          <List>
            {tasks}
          </List>
      </GridTile>
    )
  }

}

export default Task;
