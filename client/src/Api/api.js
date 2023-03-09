import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class TodoApi {
  // Individual API routes
  
  /** Signup for site. */
  static async signup(user, pass) {
    let url = `${BASE_URL}/api/register`;
    let formData = {username: user, password: pass};
    console.log("api " + user)
    let res = await axios.post(url, {username: user, password: pass});
    console.log("msg2 in s" + res.data['msg'])
    return res.data;
  }

  static async login(data) {
    let url = `${BASE_URL}/login`;
    let res = await axios.post(url, data);
    return res.data;
  }

  static async logout() {
    let url = `${BASE_URL}/logout`;
    let res = await axios.get(url);
    return res.data;
  }

  static async getMyTodos(token) {
    let data = {}
    let url = `${BASE_URL}/api/mytodos`;
    let val = "";
    
    let res = await axios.post(url, data, {
      headers: {'x-access-token': `${ token }`}
    })   
    //console.log("data from mytodos " + res.data.todos[0].task_name)    
    return res.data.todos  
  }

  static async addTodo( token, task ) {
    let url = `${BASE_URL}/api/add`;
    let res = await axios.post(url, task, {
      headers: {'x-access-token': `${ token }`}
    })    
    return res.data  
  }

  static async deleteTodo( token, id ) {
    let url = `${BASE_URL}/api/delete/${id}`;
    let data = {}
    let res = await axios.post(url, data, {
      headers: {'x-access-token': `${ token }`}
    })    
    return res.data  
  }

  static async updateTodo( token, data, id ) {
    let url = `${BASE_URL}/api/update/${id}`;
    console.log( "url " + url)
    console.log("token is " + token)
    
    let res = await axios.post(url, data, {
      headers: {'x-access-token': `${ token }`}
    })    
    return res.data;  
  }

}

export default TodoApi;