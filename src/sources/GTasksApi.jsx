import Request from './Request';

class GTasksApi
{
  constructor()
  {
    this._baseUrl = 'http://5920171e6a9bc800110a13b3.mockapi.io/api/v1/'
  }

  getLists(callbackFN, errorFN)
  {
    let config = {
      method: 'get',
      baseURL: this._baseUrl,
      url: 'list'
    };
    Request.do(config, callbackFN, errorFN);
  }

  getList(id, callbackFN, errorFN)
  {
    let config = {
      method: 'get',
      baseURL: this._baseUrl,
      url: 'list/'+id
    };
    Request.do(config, callbackFN, errorFN);
  }

  createList(listName, callbackFN, errorFN)
  {
    let config = {
      method: 'post',
      baseURL: this._baseUrl,
      url: 'list',
      data: {
        createdAt: new Date,
        name: listName,
        updatedAt: new Date,
        active: true
      }
    };
    Request.do(config, callbackFN, errorFN);
  }

  updateList(callbackFN, errorFN)
  {
    let config = {};
    Request.do(config, callbackFN, errorFN);
  }

  deleteList(callbackFN, errorFN)
  {
    let config = {};
    Request.do(config, callbackFN, errorFN);
  }

  getTask(id, callbackFN, errorFN)
  {
    let config = {
      method: 'get',
      baseURL: this._baseUrl,
      url: 'list/'+id+'/task'
    };
    Request.do(config, callbackFN, errorFN);
  }
}

export default new GTasksApi;
