import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import * as ListActions from '../actions/ListActions';
import * as TaskActions from '../actions/TaskActions';
import ListStore from '../stores/ListStore';
import TaskStore from '../stores/TaskStore';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      task: [],
      listName: '',
      taskName: '',
      message: '',
      open: false
    };
    ListActions.getLists();
  }

  handleNewList = () => {
    ListActions.createList(this.state.listName);
  }

  handleNewTask = () => {
    this.state.task.push({name: this.state.taskName});
    this.setState({task: this.state.task});
  }

  componentWillMount()
  {
    ListStore.on('LISTS_SUCCESS', this.loadLists);
    ListStore.on('CREATE_LIST_SUCCESS', this.loadCreateListSuccess);
    ListStore.on('CREATE_LIST_ERROR', this.loadCreateListError);
    TaskStore.on('TASK_SUCCESS', this.setTask);
  }

  componentWillUnmount()
  {
    ListStore.removeListener('LISTS_SUCCESS', this.loadLists);
    ListStore.removeListener('CREATE_LIST_SUCCESS', this.loadCreateListSuccess);
    ListStore.removeListener('CREATE_LIST_ERROR', this.loadCreateListError);
    TaskStore.removeListener('TASK_SUCCESS', this.setTask);
  }

  loadLists = () => {
    this.setState({lists: ListStore.getLists()})
  }

  loadTasks = (id) => {
    TaskActions.getTask(id);
  }

  setTask = () => {
    // console.log('FROM TASK COMPONENT');
    this.setState({task: TaskStore.getTask()});
  }

  loadCreateListSuccess = () => {
    this.state.lists.push({name: this.state.listName});
    this.setState({lists: this.state.lists});
    this.setState({
      open: true,
      message: 'List created'
    });
  }

  loadCreateListError = () => {
    this.setState({
      open: true,
      message: 'Error while creating your list'
    });
  }

  handleListName = (e, value) => {
    this.setState({listName: value})
  }

  handleTaskName = (e, value) => {
    this.setState({taskName: value})
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render()
  {
    const lists = this.state.lists.map((list) => {
      return <ListItem
        onTouchTap={ () => this.loadTasks(list.id)}
        rightIconButton={<IconButton> <Delete color='red' /> </IconButton>}
        leftIcon={<FormatListNumbered />}
        key={Math.random().toString()}
        primaryText={list.name} />
    });

    const tasks = this.state.task.map((task) => {
      return <ListItem
        onTouchTap={ () => this.loadTasks(task.id)}
        rightIconButton={<IconButton> <Delete color='red' /> </IconButton>}
        leftCheckbox={<Checkbox />}
        key={Math.random().toString()}
        primaryText={task.name} />
    });
    return (
      <GridList
        className="content"
        cols={3}>
        <GridTile
          style={{overflowY: 'scroll'}}
          rows={3}
          cols={1}>
          <p>List</p>
            <TextField
              ref={'listName'}
              onChange={this.handleListName}
              fullWidth={true}
              floatingLabelText="List Name"
              hintText="List Name"/>
          <RaisedButton label="Add new list" primary={true} onTouchTap={this.handleNewList} />
          <List style={{overflowY: 'scroll'}}>
            {lists}
          </List>
        </GridTile>
        <GridTile
          style={{overflowY: 'scroll'}}
          rows={3}
          cols={2}>
            <p>Tasks</p>
              <TextField
                ref={'listName'}
                onChange={this.handleTaskName}
                fullWidth={true}
                floatingLabelText="Task Name"
                hintText="Task Name"/>
              <RaisedButton label="Add new Task" primary={true} onTouchTap={this.handleNewTask} />
            <List>
              {tasks}
            </List>
        </GridTile>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </GridList>
    );
  }
}

export default TodoList;
