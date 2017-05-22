require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from './theme/theme'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import TodoList from './TodoList';

class AppComponent extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => this.setState({open: !this.state.open});

  render() {
    return (
      <MuiThemeProvider muiTheme={Theme.light()} className="index">
        <div>
          <AppBar
            title="React amazing Todo"
            iconElementLeft={<FlatButton onTouchTap={this.handleOpen}><Menu color="white" /></FlatButton>} />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({open})}>
          </Drawer>
          <div className="content">
            <TodoList />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
