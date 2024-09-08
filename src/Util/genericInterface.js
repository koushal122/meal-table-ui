import http from './http'

const genericInterface=(endPoint)=>({
    create: async(payload,params={})=> http.post(endPoint,payload,{params}),
    read: async(params={})=> http.get(endPoint,{params}),
    delete: async(params={})=> http.delete(endPoint,{params}),
    put: async(payload,params={})=> http.put(endPoint,payload,{params}),
})

genericInterface.post=genericInterface.create
genericInterface.get=genericInterface.read

export default genericInterface;