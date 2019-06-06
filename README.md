# Birch: Reflen admin console

## run birch

Dev: 
1. Make sure you have nodejs(8.x), npm and enviroment setting: `export NODE_ENV='development'`
2. Install babel-cli: `sudo npm i babel-cli -g`
3. `npm run dev`

Prod: `npm start`

## Mock API

* cd api_faker
* npm install -g graphql-faker
* npm i .
* graphql-faker ./console-api-mock.grqphql -p 8084
	* Mock reference https://github.com/APIs-guru/graphql-faker/blob/master/src/fake_definition.graphql
* node faker.js
* Edit mock graphql api `http://localhost:8084/editor/`

## Name Conversions

* Route
* Page
* Components
  * View (mix query and other sub-components)
  * Table (only display)
  * Widget (mix query but for pagelet preview only)

## Sample queries

Edit in `http://localhost:8084/editor/`

## Auth
Using graphql-request (break the apollo rules) to get session token

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

{
    "type": "SET_RUNTIME_VARIABLE",
    "payload": {
        "name": "OPEN_DECISION_SUPPORT",
        "value": 1
    }
}

{
    "type": "SET_RUNTIME_VARIABLE",
    "payload": {
        "name": "SHOW_CHAT_BUBBLE",
        "value": 1
    }
}

{
    "type": "SET_RUNTIME_VARIABLE",
    "payload": {
        "name": "SHOW_CHAT_ERROR",
        "value": 1
    }
}

{
    "type": "SET_RUNTIME_VARIABLE",
    "payload": {
        "name": "NOTIFICATIONS_COUNT",
        "value": 1
    }
}
```

Show/Hide Global (header) notification
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

Show/Hide Corner notifications
```
{
  "type": "RNS_SHOW_NOTIFICATION",
  "uid": "123123",
  "title": "Hey, it\'s good to see you!",
  "message": "Now you can see how easy it is to use notifications in React!",
  "position": "tr",
  "autoDismiss": 0,
  "level" : "info"
}

{
  "type": "RNS_HIDE_NOTIFICATION",
  "uid": "123123",
}
```


Show/Hide Snackbar notifications
```
{
  type: '@@mui-redux-alerts/OPEN_SNACKBAR',
  payload: {
    key: 'Snackbar_7',
    props: {
      message: 'I am a message',
      timestamp: 1547518418316,
      open: true
    }
  }
}

{
  type: '@@mui-redux-alerts/CLOSE_SNACKBAR',
  payload: {
    key: 'Snackbar_7'
  }
}
```

Show/Hide Console
```
{
  type: 'OPEN_CONSOLE',
  payload: {
    isOpen: true,
  }
}

{
  type: 'CLOSE_CONSOLE'
}
```

Same as: BIRCH.SIMULATE(<command>,<payload>)

```
BIRCH.SIMULATE('SET_RUNTIME_VARIABLE',{
        "name": "NOTIFICATIONS_COUNT",
        "value": 1
    })

```


## Note

* Using Apollo 1.x
  * upload file in graphql: https://github.com/jaydenseric/graphql-multipart-request-spec
* Server side rendering
* Universal router
  * https://github.com/erikras/react-redux-universal-hot-example
* Make an ad-hoc request (e.g., login) by graphql-request https://github.com/prisma/graphql-request
* Seeding data generator
  * https://www.npmjs.com/package/dummy-json
* Icons: https://react-icons.netlify.com/#/
* Top search https://www.algolia.com/ref/docsearch/?utm_source=docsearch&utm_medium=link&utm_term=footer&utm_campaign=material-ui.com
* theme color: https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=311B92
* default theme: https://material-ui.com/customization/default-theme/
* Using js styling and dump css: https://transform.now.sh/css-to-js/