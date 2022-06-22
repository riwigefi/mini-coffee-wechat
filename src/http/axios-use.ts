import axios from 'axios';

// Handling Errors

axios.get(`/user/123`).catch((error) => {
  if (error.response) {
    // the request was made and the server responded with a status code that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // the request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that trigged an Error
    console.log(`Error--`, error.message);
  }
  console.log(error.config);
});

// Using the `validateStatus` config option,you can define HTTP code(s) that should throw an error

axios.get(`/user/12345`, {
  validateStatus: (status) => {
    return status < 500;
  },
});

// Using `toJson` you get an object with more information about the HTTP error
axios.get(`/user/123456`).catch((error) => {
  console.log(error.toJSON());
});

// Automatic serialization to URLSearchParams
// Axios will automatically serialize the data object to urlencoded format if the content-type header is set "application/x-www-form-urlencoded"

const data = {
  x: 1,
  arr: [1, 2, 3],
  arr2: [1, [2], 3],
  users: [
    {
      name: 'Peter',
      surname: 'Griffin',
    },
    {
      name: 'Thomas',
      surname: 'Anderson',
    },
  ],
};

axios.postForm('https://postman-echo.com/post', data, {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});

// The server will handler it
const serverData = {
  x: '1',
  'arr[]': ['1', '2', '3'],
  'arr2[0]': '1',
  'arr2[1][0]': '2',
  'arr2[2]': '3',
  'arr3[]': ['1', '2', '3'],
  'users[0][name]': 'Peter',
  'users[0][surname]': 'griffin',
  'users[1][name]': 'Thomas',
  'users[1][surname]': 'Anderson',
};

console.log('server-data-', serverData);

/**
 * If your backend body-parser(like body-parser of express.js) supports nested object decoding
 * you will get the same object on the server-side automatically
 * var app = express()
 * // support encoded bodies
 * app.use(bodyParser.urlencoded({ extended: true}))
 * app.post(`/`, function(res,req) {
 *  // echo body as JSON
 *  res.send(JSON.stringify(req.body))
 * })
 * app.listen(8000)
 */
