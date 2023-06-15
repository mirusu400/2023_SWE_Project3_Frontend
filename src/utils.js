import axios from 'axios'
import Cookies from 'universal-cookie';
const post = async (url, data) => {
  // Get cookie
  const token = new Cookies().get('JWT');
  console.log(data);
  const response = await axios.post(url, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response;
}

const postBoard = async (url, data, file = undefined) => {
  const token = new Cookies().get('JWT');
  const formData = new FormData();
  if (file)
    formData.append('files', file);
  formData.append('board_id', data.board_id);
  formData.append('user_id', data.user_id);
  formData.append('name', data.name);
  formData.append('content', data.content);
  formData.append('type', data.type);
  const response = await axios.post(url, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response;

}

const postFile = async (url, lectureId, file) => {
  // Get cookie
  const token = new Cookies().get('JWT');
  const formData = new FormData();
  formData.append('video', file);
  formData.append('lecture', lectureId);
  const response = await axios.post(url, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  return response;
}

const get = async (url) => {
  const token = new Cookies().get('JWT');
  const response = await axios.get(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response;
}

const put = async (url, data) => {
  const token = new Cookies().get('JWT');
  const response = await axios.put(url, data, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response;
}

const del = async (url) => {
  const token = new Cookies().get('JWT');
  const response = await axios.delete(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response;
}


export {
  post, get, postFile, postBoard,
  put, del
}

