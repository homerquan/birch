# convospot.io admin console


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
query {
  conversations(clientId:"ddcd39c9-dcbc-4a26-bcf7-525d77c12d54") {
    id
    visitor
    client
    mode
    updatedAt
  }
}
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
query {
  conversations {
    id
     messages(first:2){
      edges {
        cursor
        node {
          id
          source
          text
        }
      }
    }
  }
}

query {
 NotificationsFeed(clientId:"abc") {
  notifications(first:1,last:10, filter:["status=unread"] ){
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
  ConversationsFeed(clientId:"abc",botId:"123") {
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