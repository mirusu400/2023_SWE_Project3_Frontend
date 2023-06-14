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





export {
  post, get, postFile
}

