import axios from 'axios'

class Request {
  do(config, sucessFn, errorFn)
  {
    axios(config)
      .then((data) => {
        if (this.statusHandler(data)) {
          sucessFn(data);
        } else {
          errorFn(data);
        }
      })
      .catch((err) => {
        errorFn(err);
      });
  }

  statusHandler(data)
  {
    let result = false;
    switch(data.status)
    {
      case 200: {
        result = true;
        break;
      }
      case 201: {
        result = true;
        break;
      }
      case 401: {
        break;
      }
      case 404:{
        break;
      }
      case 500: {
        break;
      }
    }

    return result;
  }
}

export default new Request;
