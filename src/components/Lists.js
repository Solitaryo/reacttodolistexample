// TODO: Implement this as a component inside TodoList
import React from 'react';
import {GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import * as ListActions from '../actions/ListActions';
import * as TaskActions from '../actions/TaskActions';
import ListStore from '../stores/ListStore';

class Lists extends React.Component
{

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    ListActions.getLists();
  }

  handleNewList = () => {
    this.state.lists.push({name: 'New List'});
    this.setState({lists: this.state.lists});
  }

  componentWillMount()
  {
    ListStore.on('LISTS_SUCCESS', this.loadLists);
  }

  componentWillUnmount()
  {
    ListStore.removeListener('LISTS_SUCCESS', this.loadLists);
  }

  loadLists = () => {
    this.setState({lists: ListStore.getLists()})
  }

  loadTasks = (id) => {
    TaskActions.getTask(id);
  }

  render() {
    const lists = this.state.lists.map((list) => {
      return <ListItem
        onTouchTap={ () => this.loadTasks(list.id)}
        rightIconButton={<IconButton> <Delete /> </IconButton>}
        leftIcon={<FormatListNumbered />}
        key={Math.random().toString()}
        primaryText={list.name} />
    });
    return (
      <GridTile
        rows={3}
        cols={1}>
        <p>List</p>
        <RaisedButton label="Add new list" primary={true} onTouchTap={this.handleNewList} />
        <RaisedButton label="Delete list" secondary={true} />
        <List style={{overflowY: 'scroll'}}>
          {lists}
        </List>
      </GridTile>
    );
  }
}

export default Lists;
