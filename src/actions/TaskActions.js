import dispatcher from '../dispatcher/AppDispatcher';
import GTasksApi from '../sources/GTasksApi';

export function getTask(id)
{
  GTasksApi.getTask(id, function(data, error) {
    if (!error && data) {
      dispatcher.dispatch({status: 'GET_TASK_SUCCESS', data: data});
    } else {
      dispatcher.dispatch({status: 'GET_TASK_ERROR', data: JSON.stringify(error)});
    }
  }, (error) => {
      dispatcher.dispatch({status: 'GET_TASK_ERROR', data: JSON.stringify(error)});
  });
}
