import dispatcher from '../dispatcher/AppDispatcher';
import GTasksApi from '../sources/GTasksApi';

export function getLists()
{
  GTasksApi.getLists(function(data, error) {
    if (!error && data) {
      dispatcher.dispatch({status: 'GET_LISTS_SUCCESS', data: data});
    } else {
      dispatcher.dispatch({status: 'GET_LISTS_ERROR', data: JSON.stringify(error)});
    }
  }, (error) => {
      dispatcher.dispatch({status: 'GET_LISTS_ERROR', data: JSON.stringify(error)});
  });
}

export function createList(listName)
{
  GTasksApi.createList(listName, function(data, error) {
    if (!error && data) {
      dispatcher.dispatch({status: 'POST_LIST_SUCCESS', data: data});
    } else {
      dispatcher.dispatch({status: 'POST_LIST_ERROR', data: JSON.stringify(error)});
    }
  }, (error) => {
      dispatcher.dispatch({status: 'POST_LIST_ERROR', data: JSON.stringify(error)});
  });
}
