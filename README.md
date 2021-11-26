# Linked Line Log Service

Web service to allow users, when invoking an API method (POST), to write on a shared log file such that each entry (
line) is linked to the previous one using it’s hash and a proof of work (SHA256). The service is written in NodeJs's
Typescript language

## Installation + Running

Once the source code is cloned, run

```shell
$ npm install
```

to install the dependencies. Once installed, run

```shell
$ npm run build_start
```

to compile the typescript code and run the service. Other run scripts are:

```shell
# Compiles the Typescript code into the corresponding .js files
$ npm run build

# Run the code without compiling the typescript code. Use only if
# the code is already compiled.
$ npm run start

# Run tests using the Jest Framework
$ npm run test
```

### Using the Service

Once the server is up and running, users can run a POST API Call to http://{host}:8000/log-service/ being host localhost
by default. In order to write the log in our output file, the user must pass in the request body an object with the
variable "text", like in the example below:
```json
{
  "text": "string"
}
```
The responses might be 202 if the request was accepted and started to be processed or 400 if there was nothing to be written in the log file.

In order to check the output file, open logs.txt. All other logs (error and info) are on their respoctive .log files.

## Future Developments

As the code was not written for commercial use, it was thought to run on a single server / container using NodeJs's
Event Loops. Thus, for future improvements in performance, worker threads might be a solution for better competing logs.