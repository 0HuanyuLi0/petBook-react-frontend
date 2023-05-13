
let BASE_URL;

if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000/';
} else {
    BASE_URL = 'https://54.213.130.218:3000/';
    // BASE_URL = 'https://petbook-server-huanyuli.herokuapp.com/';
}

export default BASE_URL
