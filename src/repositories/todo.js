import axios from 'axios';
const endpoint = '/todos';

export class ITodoRepository {
  fetch() {
    return axios.get(endpoint);  
  }

  save(item) {
    return axios.post(endpoint + '/' + item.id, 
      {
        todo: item
      }
    )
  }

  find(id) {
    return axios.get(endpoint + '/' + id);
  }

  update(item) {
    return axios.post(endpoint + '/' + item.id, 
    {
      todo: item
    }
  )
  }
  delete(id) {
    return axios.delete(endpoint + '/' + id);
  }
}

export class TodoLocalStorageRepository extends ITodoRepository {
  __getItems() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  save(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      items.push(model);
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(model);
    })
  }

  delete(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.id === model.id) {
          items.splice(i, 1);
        }
      }
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(items);
    })
  }

  edit(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.id === model.id) {
          items[i] = model
        }
      }
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(items);
    })
  }

  find(id) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      const res = items.filter((item) => {
        return item.id === id
      });
      if (res.length > 0) {
        return resolve(res[0]);
      }
      return resolve(null);
    })
  }


  fetch() {
    return new Promise((resolve) => {
      resolve(this.__getItems());
    })
  }
}
