
let BASE_URL;

if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://petbook-nodejs-backend.onrender.com/';
    // BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}

export default BASE_URL
