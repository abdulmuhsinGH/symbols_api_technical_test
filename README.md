
## Instructions

develop an api in nodejs with 3 routes.

The first route, /auth, is the only unauthenticated route.

It takes a json username and password in the form `{"username":"foo", "password":"bar"}` and returns a jwt token that can then be used to access the other routes.

the second route, /status, simply returns the json {"status":"okay"} when accessed with a valid token via POST, otherwise, {"status":"forbidden"}. Return method not supported for GET

the third route, /symbol, takes the json `{"name":"<name>", "meaning":"<meaning>", synopsis:"<synopsis>"}` and a valid token and makes a request to the external API at [https://github.com/Skywalker427/adinkra] with the json end. Return method not supported for GET requests.


## Getting Started
create and `.env` from using the `.env.template` file 
and set your `PORT` an dand `JWT_SECRET` value

run the command `npm install` to install all dependencies

run the command `npm start` in the root directory of the project to start the server

then go to locahost:<PORT>/ to access the server

### ENDPOINTS

`POST locahost:<PORT>/auth` - to get a web token by providing a `username` and `password` in the body. both required

`POST locahost:<PORT>/status` - to get status of the api; provide token in the header - `Authorization: <TOKEN>`

`POST locahost:<PORT>/symbol `- get data on akan symbols
provide token in the header - `Authorization: <TOKEN>`
