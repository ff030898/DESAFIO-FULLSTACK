import axios from 'axios'

export const baseURL = 'http://192.168.15.14:3333'

export const baseURLQRCode = 'http://192.168.15.14:3000/create'

const api = axios.create({ baseURL })

export async function getRequests(){
  return await api.get('/requests').then(({ data }) => data);
}

export async function getRequestsByStatus (status: String) {

  return await api.get('/requests', {
    params: {
      status
    }
  }).then(({ data }) => data)
}

export async function createRequest (dataSend:any) {
  return await api.post('/requests', dataSend)
}

export async function updateRequest(id: number, data:any){
  return await  api.put(`/requests/${id}`, data)
}

export default api
