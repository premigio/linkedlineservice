# Linked Line Log Service

Web service to allow users, when invoking an API method (POST),
to write on a shared log file such that each entry (line) is linked to the previous one using it’s
hash and a proof of work (SHA256).
The service is written in NodeJs's Typescript language

## Installation + Running

Once the source code is cloned, run

```
$ npm install
```
to install the dependencies. Once installed, run 

```
$ npm run build_start
```
to compile the typescript code and run the service. Other run scripts are:
```
# Compiles the Typescript code into the corresponding .js files
$ npm run build

# Run the code without compiling the typescript code. Use only if
# the code is already compiled.
$ npm run start

# Run tests using the Jest Framework
$ npm run test
```

## Future Developments

As the code was not written for commercial use, it was thought to run on a single server / container using NodeJs's Event Loops. Thus, for future improvements in performance, worker threads might be a solution for better competing logs.