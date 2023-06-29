// import {CommonApiHeader} from '../constants/index';

class HttpService {
  requestPostOrPut(data, endpoint, method) {
    return new Promise(async (resolve, reject) => {
      fetch(endpoint, {
        method: method,
        // headers: await CommonApiHeader(),
        body: JSON.stringify(data),
      })
        .then(async resp => {
          const response = await resp.json();
          if (resp.status === 200 || resp.status === 201) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  requestGet(endpoint) {
    return new Promise(async (resolve, reject) => {
      fetch(endpoint, {
        method: 'GET',
        //  headers: await CommonApiHeader(),
      })
        .then(async resp => {
          const response = await resp.json();
          if (resp.status === 200 || resp.status === 201) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
export default new HttpService();
