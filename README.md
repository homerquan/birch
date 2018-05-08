# convospot.io admin console


## Mock API

* cd api_faker
* npm install -g graphql-faker
* npm i .
* graphql-faker ./console-api-mock.grqphql -p 8084
	* Mock reference https://github.com/APIs-guru/graphql-faker/blob/master/src/fake_definition.graphql
* node faker.js
* Edit mock graphql api `http://localhost:8084/editor/`

## Debug runtime 

In redux dev tool, dispatch events such as

```
{
    "type": "SET_RUNTIME_VARIABLE",
    "payload": {
        "name": "test",
        "value": 1
    }
}
```

```
{
    "type": "ADD_GLOBAL_NOTIFICATION",
    "payload": {
        "id": 123,
        "text": "test",
        "link": "/"
    }
}

{
    "type": "IGNORE_GLOBAL_NOTIFICATION"
}
```

## Note

* Using Apollo 1.x
* Server side rendering
* Universal router
  * https://github.com/erikras/react-redux-universal-hot-example