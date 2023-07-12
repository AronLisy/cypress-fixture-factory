# Entity Generator

## Setup generator

### Create new EntityGenerator

Assign instance of a class to a constant and give it default fixture in constructor. Fixture generator will return this fixture as default when using method getEntity().

```typescript
const defaultFixture = {
    "id": "1"
    "type": "example-entities",
    "attributes": {
        "name": "example name",
        "shortcut": "exmp"
    }
}

const entityGenerator = new JsonApiEntityGenerator<EntityType>(defaultFixture);
```

### Set default entities

Use method `setEntities()` to set default entities. Use number of entities as first parameter and array of entity changes as second parameter. You don't have to use whole entity, just properties you want to change from default.

For example this:

```typescript
entityGenerator.setEntities(3, [
    {},
    {
        "attributes": {
            "name": "second name"
            "shortcut": "second shortcut"
        }
    }
]);
```

...will set entities as:

```json
[
    {
        "id": "1"
        "type": "example-entities",
        "attributes": {
            "name": "example name",
            "shortcut": "exmp"
        }
    },
    {
        "id": "2"
        "type": "example-entities",
        "attributes": {
            "name": "second name"
            "shortcut": "second shortcut"
        }
    },
    {
        "id": "3"
        "type": "example-entities",
        "attributes": {
            "name": "example name",
            "shortcut": "exmp"
        }
    }
]
```

## Generate entity

### Get default entity

Use method `getEntity()` to get fixture of default entity

```typescript
entityGenerator.getEntity();
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": {
        "id": "1"
        "type": "example-entities",
        "attributes": {
            "name": "example name",
            "shortcut": "exmp"
        }
    },
    "included": [],
    "links": {},
    "meta": {
        "total": 1,
        "offset": 0,
        "limit": 50
    }
}
```

### You can get modified entity

You can get modified entity when you fill entity changes into method parameter:

```typescript
entityGenerator.getEntity({
    "attributes": {
        "name": "modified name"
    }
});
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": {
        "id": "1"
        "type": "example-entities",
        "attributes": {
            "name": "modified name"
            "shortcut": "exmp"
        }
    },
    "included": [],
    "links": {},
    "meta": {
        "total": 1,
        "offset": 0,
        "limit": 50
    }
}
```

### You can modify even id

```typescript
entityGenerator.getEntity({
    "id": "modified-id"
});
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": {
        "id": "modified-id"
        "type": "example-entities",
        "attributes": {
            "name": "example name",
            "shortcut": "exmp"
        }
    },
    "included": [],
    "links": {},
    "meta": {
        "total": 1,
        "offset": 0,
        "limit": 50
    }
}
```

## Generate entities

### Get default entities

Calling method `getEntities()` without any parameter will get you default enitites you set previously.

```typescript
entityGenerator.getEntities();
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": [
        {
            "id": "1"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        },
        {
            "id": "2"
            "type": "example-entities",
            "attributes": {
                "name": "second name"
                "shortcut": "second shortcut"
            }
        },
        {
            "id": "3"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        }
    ],
    "included": [],
    "links": {},
    "meta": {
        "total": 3,
        "offset": 0,
        "limit": 50
    }
}
```

### Get different number of entities

Using first parameter numOfEntities you can get less or more entities than you set.

```typescript
entityGenerator.getEntities(1);
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": [
        {
            "id": "1"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        }
    ],
    "included": [],
    "links": {},
    "meta": {
        "total": 1,
        "offset": 0,
        "limit": 50
    }
}
```

If you ask for more entities than you set all additional will be defaultEntity with according "id":

```typescript
entityGenerator.getEntities(5);
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": [
        {
            "id": "1"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        },
        {
            "id": "2"
            "type": "example-entities",
            "attributes": {
                "name": "second name"
                "shortcut": "second shortcut"
            }
        },
        {
            "id": "3"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        },
        {
            "id": "4"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        },
        {
            "id": "5"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        }
    ],
    "included": [],
    "links": {},
    "meta": {
        "total": 5,
        "offset": 0,
        "limit": 50
    }
}
```

### Get modified entities

Using second parameter, you can set array of changes for entities you want return:

```typescript
entityGenerator.getEntities(3, [
    {
        "attributes": {
            "name": "modified name 1"
        }
    },
    {},
    {
        "id": "modified-id"
        "attributes": {
            "name": "modified name 3"
        }
    }
]);
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": [
        {
            "id": "1"
            "type": "example-entities",
            "attributes": {
                "name": "modified name 1"
                "shortcut": "exmp"
            }
        },
        {
            "id": "2"
            "type": "example-entities",
            "attributes": {
                "name": "second name"
                "shortcut": "second shortcut"
            }
        },
        {
            "id": "modified-id"
            "type": "example-entities",
            "attributes": {
                "name": "modified name 3"
                "shortcut": "exmp"
            }
        }
    ],
    "included": [],
    "links": {},
    "meta": {
        "total": 3,
        "offset": 0,
        "limit": 50
    }
}
```

If you want change for example just first entity, you don't have to specify other changes in the parameter. You will get rest of the entities those you set with method `setEntities()`. For example if you want to modify just first entity:

```typescript
entityGenerator.getEntities(3, [{
    "attributes": {
        "name": "modified name"
    }
}]);
```

## Get entities with some of them deleted

If you want to omit some entity/entities (scenario when you delete one of those entities), you can set it as null in entity changes and it will be omited.

```typescript
entityGenerator.getEntities(3, [
    {},
    null
]);
```

...returns:

```json
{
    "jsonapi": {
        "version": '1.0'
    },
    "data": [
        {
            "id": "1"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        },
        {
            "id": "3"
            "type": "example-entities",
            "attributes": {
                "name": "example name",
                "shortcut": "exmp"
            }
        }
    ],
    "included": [],
    "links": {},
    "meta": {
        "total": 2,
        "offset": 0,
        "limit": 50
    }
}
```
