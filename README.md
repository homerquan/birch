# convospot.io admin console

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

## Sample queries

Edit in `http://localhost:8084/editor/`


```
An example with variable:

```
subscription onUpdateConversation($clientId:String) {
  updateConversation(clientId:$clientId) {
    id
    status
  } 
}
```
using variable:
```
{
  "clientId": "ddcd39c9-dcbc-4a26-bcf7-525d77c12d54"
}
```

with pagination:
```
query{
  messagesFeed(conversationId:"uuid") {
    messages(first:1) {
      edges {
       node {
         id
         source
         text
       }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}


query {
 notificationsFeed(clientId:"abc") {
  notifications(filter:["status=unread"] ){
    totalCount
    edges{
      node {
        id
        text
        status
      }
    }
    pageInfo{
      hasNextPage
      endCursor
    }
  }
 }
}


query 
{
  conversationsFeed(clientId:"abc",botId:"123") {
    conversations(first:1){
      edges {
        cursor
        node{
          id
          visitor
          client
          intentions {
            name
            score
          }
          actions {
            source
            name
            status
          }
          mode
          updatedAt
        }
      }
    }
  }
}

query {
  conversation(conversationId:"a87cb625-18fb-4929-a2fc-e588aab28c5"){
    messages(first:1) {
     edges {
      node {
        id
        text
        source
      }
     }
     totalCount
     pageInfo {
      hasNextPage
      endCursor
    }
   }
  }
}

query{
  botsFeed(clientId:"uuid") {
    bots(first:1) {
      edges {
       node {
         id
         host
       }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}

query{
  pluginsFeed(conversationId:"uuid") {
    bots(first:1) {
      edges {
       node {
         id
         image
         name
         description
       }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}

```

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

```
{
  "type": "RNS_SHOW_NOTIFICATION",
  "title": "Hey, it\'s good to see you!",
  "message": "Now you can see how easy it is to use notifications in React!",
  "position": "tr",
  "autoDismiss": 0,
  "level" : "info"
}
```

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