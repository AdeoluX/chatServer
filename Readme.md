# Recruitment Test

Microservice template (Mongodb/NoSQL) with Mongoose ORM and Generic response and Error handler

## End Points

#### property

- endpoint to create property `POST` `${base_url}/api/v1/property/create`

```json
form data
{
  "name": "string", //<optional>
  "address": "string", //<optional>
  "type": "string", //<optional>
  "description": "string", //<optional>
  "total_rooms": "string", //<optional>
  "occupancy_type": "string", //<optional>
  "rent_frequency": "string", //<optional>
  "is_published": boolean, //<optional>
  "image": <File> //<optional>
}
```

- endpoint to update property `PUT` `${base_url}/api/v1/property/:property_id`

```json
form data
{
  "name": "string", //<optional>
  "address": "string", //<optional>
  "type": "string", //<optional>
  "description": "string", //<optional>
  "total_rooms": "string", //<optional>
  "occupancy_type": "string", //<optional>
  "rent_frequency": "string", //<optional>
  "is_published": boolean, //<optional>
  "image": <File> //<optional>
}
```

- endpoint to get all properties `GET` `${base_url}/api/v1/property/get-all`
- endpoint to publish property `PUT` `${base_url}/api/v1/property/publish/:property_id`
- endpoint to delete property `DELETE` `${base_url}/api/v1/property/:property_id`
- endpoint to search by address `GET` `${base_url}/api/v1/property?address=<string-goes-here>`

#### user

- endpoint to sign-up user `POST` `${base_url}/api/v1/auth/signup`

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string"
}
```

- endpoint to login `POST` `${base_url}/api/v1/auth/login`

```json
{
  "email": "string",
  "phone": "string"
}
```

## Routes

- Route with auth middleware requires token
- Token lasts for 24 hours
- For authenticated routes, tokens should be present in the Authorization header as such
  `Authorization: Bearer sampleusertoken`
- Success response is in the format

```json
{
    "status": 200,
    "success": true,
    "message": "success",
    "data": {
        ...
    }
}
```

- Error response is in the format

```json
{
    "status": <error_code>,
    "success": false,
    "message": "Sample error message",
    "data": []
}
```

- Responses with status code 422 (validation errors) will contain a JSON object as message, describing the errors for each field

```json
{
  "status": 422,
  "success": false,
  "message": {
    "custom_field_1": [
      "Validation error message for custom_field_1",
      "Another validation error message for custom_field_1"
    ],
    "custom_field_2": ["Validation error message for custom_field_2"]
  },
  "data": []
}
```
