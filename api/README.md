# TaskMate

## -- Users --

/api/user/register

body:
```
{
    "name": "Chris Hemsworth",
    "email": "xxxx@email.com",
    "password": "xxxxx"
}
```

Response
```
{
    "message": "Registration is successful."
}
```

Error scenarios

```
{
    "message": "This email is already registered."
}
```


/api/user/login

body:

```
{
    "email": "james@email.com",
    "password": "xxxxx"
}
```

response:

```
{
    "message": "Login successful."
}
```

response headers:
```
user-jwt: xxxxxx
```