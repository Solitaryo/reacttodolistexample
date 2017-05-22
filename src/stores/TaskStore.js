import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class TaskStore extends EventEmitter
{

  constructor(props) {
    super(props);
    this.task = [];
  }

  getTask()
  {
    return this.task.data;
  }

  handleAction(action)
  {
    switch (action.status) {
      case 'GET_TASK_SUCCESS':
      {
        this.task = action.data;
        this.emit('TASK_SUCCESS');
        break;
      }

      case 'GET_TASK_ERROR':
      {
        this.emit('TASK_ERROR');
        break;
      }
    }
  }

}

const taskStore = new TaskStore;
dispatcher.register(taskStore.handleAction.bind(taskStore));
export default taskStore;
