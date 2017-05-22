import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher';

class ListStore extends EventEmitter
{

  constructor(props) {
    super(props);
    this.lists = null;
  }

  getLists()
  {
    return this.lists.data;
  }

  handleAction(action)
  {
    switch (action.status) {
      case 'GET_LISTS_SUCCESS':
      {
        this.lists = action.data;
        this.emit('LISTS_SUCCESS');
        break;
      }

      case 'GET_LISTS_ERROR':
      {
        this.emit('LISTS_ERROR');
        break;
      }
      case 'POST_LIST_SUCCESS':
      {
        this.emit('CREATE_LIST_SUCCESS');
        break;
      }

      case 'POST_LIST_ERROR':
      {
        this.emit('CREATE_LIST_ERROR');
        break;
      }
    }
  }

}

const listStore = new ListStore;
dispatcher.register(listStore.handleAction.bind(listStore));
export default listStore;
