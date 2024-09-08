
export const getJwtToken = ()=>{
    return localStorage.getItem('jwt_token');
}

export const setJwtToken = async (response) =>{
    localStorage.setItem('jwt_token',await response.data.jwtToken);
}

export default getJwtToken;