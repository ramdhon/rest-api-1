# My App Name

built with `Express` and `Sequelize`

## Usage
Make sure you have Node.js and npm installed in your computer and then run these commands:
```console
$ npm install
$ npm start
```
For development purpose, you can run:
```console
$ npm install
$ npm run dev
```
Make sure you have set all required your .env parameters
<br>(key reference: .env.example)

Access the REST API via SERVER_URL = `http://localhost:3000/api`

## REST API Routes:

### AUTHENTICATION

- **Register**
  - URL:
    - **`POST`** *`<SERVER_URL>/register`*
  - Body:
    - `name`: `String`, required
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "message": "account created",
        "user":
        {
          "id": "<generatedId>",
          "name": "<registeredName>",
          "email": "<registeredEmail>",
          "password": "<hashedPassword>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "err": "<detailedErrors>"
      }
      ```
      Notes:
      - ERROR `400` is caused by entering *empty name* or *empty email* or *duplicated email* or *email not valid format* or *empty password*

- **Login**
  - URL:
    - **`POST`** *`<SERVER_URL>/login`*
  - Body:
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `200`):
    ```json
      {
        "message": "login success",
        "token": "<accessToken>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "invalid username / password"
      }
      ```
      Notes:
      - ERROR `400` is caused by entering *empty email* or *empty password* or *invalid username / password*


### TODOS

- **GET LIST OF TODOS**
  - URL:
    - **`GET`** *`<SERVER_URL>/todos`*
  - URL (filtered):
    - **`GET`** *`<SERVER_URL>/api/todos?title=<KEYWORD>`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "todos": [
          {
            "id": "<id>",
            "title": "<title>",
            "description": "<description>",
            "userId": "<userIdFK>"
          }, 
          {
            ...
          }, 
          ...
        ]
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
        {
          "message": "<authentication message>",
        }
      ```
      Notes:
      <br>Messages:
      - no token assigned
      - invalid access token
      - not recognized input data

    - status: `404`:
      ```json
        {
          "message": "data empty",
          "todos": []
        }
      ```
  
- **CREATE NEW TODO**
  - URL:
    - **`POST`** *`<SERVER_URL>/todos`*
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "message": "data created",
        "newTodo":
        {
          "id": "<generatedId>",
          "title": "<registeredTitle>",
          "description": "<registeredDescription>",
          "userId": "<userIdFK>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>",
        "err": "<detailedErrors>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - invalid access token
        - not recognized input data
      - ERROR `400` is caused by entering *empty title* or *empty description* or 
    
- **GET TODO BY ID**
  - URL:
    - **`GET`** *`<SERVER_URL>/todos/:id`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "todo": 
        {
          "id": "<id>",
          "title": "<title>",
          "description": "<description>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>",
        "err": "<detailedErrors>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - invalid access token
        - not recognized input data
      - ERROR `400` is caused by entering *empty title* or *empty description* or 
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access",
        "err": "<detailedErrors>"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found",
          "todo": null
        }
      ```

- **UPDATE USER BY ID**
  - Notes:
    - Authorization: only authenticated user's todo can be accessed
  - URL(s):
    - **`PUT`** *`<SERVER_URL>/todos/:id`*
    - **`PATCH`** *`<SERVER_URL>/api/todos/:id`*
    <br>Notes:
        - `PUT` method is used for updating all details of data
        - `PATCH` method is used for updating some details of data
  - Header(s):
    - `token`: `String`
  - Body:
    - `title`: `String`, required
    - `description`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedTodo":
        {
          "id": "<id>",
          "title": "<registeredTitle>",
          "description": "<registeredDescription>",
          "userId": "<userIdFK>"
        },
        "info": "<info>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>",
        "err": "<detailedErrors>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - invalid access token
        - not recognized input data
      - ERROR `400` is caused by entering *empty title* or *empty description* or 
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access",
        "err": "<detailedErrors>"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found to update",
        }
      ```

- **DELETE USER BY ID**
  - Notes:
    - Authorization: only authenticated user's todo can be accessed
  - URL(s):
    - **`DELETE`** *`<SERVER_URL>/todos/:id`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data deleted",
        "deletedTodo":
        {
          "id": "<deletedId>",
          "title": "<deletedTitle>",
          "description": "<deletedDescription>",
          "userId": "<userIdFK>"
        },
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>",
        "err": "<detailedErrors>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - invalid access token
        - not recognized input data
      - ERROR `400` is caused by entering *empty title* or *empty description* or 
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access",
        "err": "<detailedErrors>"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found to delete",
        }
      ```
