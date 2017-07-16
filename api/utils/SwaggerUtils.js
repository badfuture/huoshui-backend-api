const sailsToSwagTypeMap = (sailsType) => {
  sailsType = sailsType.toLowerCase()
  var mapping = {
    integer: {
      type: 'integer',
      format: 'int32'
    },
    float: {
      type: 'number',
      format: 'float'
    },
    double: {
      type: 'number',
      format: 'double'
    },
    string: {
      type: 'string',
      format: 'string'
    },
    binary: {
      type: 'string',
      format: 'binary'
    },
    boolean: {
      type: 'boolean'
    },
    date: {
      type: 'string',
      format: 'date'
    }
  }
  if (!mapping[sailsType]) {
    return mapping['string']
  }
  return mapping[sailsType]
}

const actionToParamMap = (action) => {
  var mapping = {
    limit: {
      "name": "limit",
      "in": "query",
      "description": "max number of records to return",
      "required": false,
      "default": 3,
      "type": "integer",
      "format": "int32"
    },
    skip: {
      "name": "skip",
      "in": "query",
      "description": "skip certain number of records before returning",
      "required": false,
      "default": 0,
      "type": "integer",
      "format": "int32"
    },
    sort: {
      "name": "sort",
      "in": "query",
      "description": "sort the records",
      "required": false,
      "default": "id ASC",
      "type": "string"
    },
    populate: {
      "name": "populate",
      "in": "query",
      "description": "populate the records",
      "required": false,
      "default": "Prof,School,Depts,Stat",
      "type": "string"
    },
    deptSubquery: {
      "name": "$Depts.shortname$",
      "in": "query",
      "description": "query on property of a populated object",
      "required": false,
      "default": "土木",
      "type": "string"
    }
  }
  return mapping[action]
}

module.exports = {
  defaultResp: () => ({
    "200": {
      "description": "success: return a single object"
    },
    "404": {
      "description": "data not found"
    }
  }),

  actionToWord: (action) => {
    var word = "";
    switch (action) {
      case "get":
        word = "find";
        break;
      case "post":
        word = "create";
        break;
      case "put":
        word = "update";
        break;
      case "delete":
        word = "remove";
        break;
      default:
        word = action;
    }
    return word;
  },

  sailsToSwagAction: (sailsPath) => {
    var sailsAction = (sailsPath.match(/(^[a-zA-z]+)/)[1]).toLowerCase();
    return sailsAction;
  },

  sailsToSwagPath: (sailsPath) => {
    var swaggerPath = sailsPath.substr(sailsPath.indexOf('/'), sailsPath.length);
    swaggerPath = swaggerPath.replace(/:(\w+)/, '{$1}');
    return swaggerPath;
  },

  actionListToSwagParams: (paramList) => {
    let result = []
    paramList.forEach((param) => {
      result.push(actionToParamMap(param))
    })
    return result
  },

  sailsToSwagDefinitions: (sailsModel) => {
    /*
    // sample output
    {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        }
      }
    }
    */
    let result = {
      "type": "object",
      "required": [],
      "properties": {}
    }

    let attributes = sailsModel.attributes;
    Object.keys(attributes).forEach(function(field){

      let attr = attributes[field]
      let fieldName = attr.field
      let isRequired = !attr.allowNull
      let exampleValue = attr.exampleValue

      //add to required list
      if (isRequired) {
        result.required.push(field)
      }

      //add to proerpty list
      let sailsType = attr.type.key
      result.properties[fieldName] = sailsToSwagTypeMap(sailsType)
      result.properties[fieldName].example = exampleValue

    })

    // add id field if not present
    if (!result.properties['id']) {
      result.properties['id'] =  sailsToSwagTypeMap('integer')
    }
    result.properties['id'].example = 1

    return result
  },
}
