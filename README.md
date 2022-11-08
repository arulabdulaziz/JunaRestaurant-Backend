# JunaRestaurant - Backend
For the deployed link, follow link below
https://juna-restaurant.herokuapp.com/product

### Account
You can use account below
- As user
```yaml
    username: user
    password: 1234
```
- Or you can use as admin
```yaml
    username: admin
    password: 1234
```

## API Documentation
### Basic Response
    - Success
    {
        "data": Object | Array
    }
    - Error
    {
        "message": String
    }
### Login
    Url: /login
    Method: POST
    Body: {
        "username": String
        "password": String
    }
    response: {
        "data": {
            "token": String
            "user": Object
        }
    }
### Register
    Url: /register
    Method: POST
    Body: {
        "full_name": String
        "username": String
        "password": String
    }
    response: {
        "data": Object
    }
### Get All Product
    Url: /product
    Method: GET
    response: {
        "data": Array<Object>
    }
### Get One Product By id
    Url: /product/:id
    Method: GET
    response: {
        "data": Object
    }
### Add Product 
    Url: /product
    Method: POST
    Headers: {
        "token": String<as admin>
    }
    Body: {
        "name": String
        "picture": String | url
        "price": Number
    }
    response: {
        "data": Object
    }
### Update Product 
    Url: /product/:id
    Method: PUT
    Headers: {
        "token": String<as admin>
    }
    Body: {
        "name": String
        "picture": String | url
        "price": Number
    }
    response: {
        "data": Object
    }
### Delete Product 
    Url: /product/:id
    Method: DELETE
    Headers: {
        "token": String<as admin>
    }
    response: {
        "data": Object
    }