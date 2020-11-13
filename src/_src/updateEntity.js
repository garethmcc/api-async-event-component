exports.updateEntity = async (event, context) => {
  let id = event.pathParameters.id
  let body = {}

  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.log('There was an error parsing the JSON body: ' + event.body)
    return {
      statusCode: 400
    }
  }
  if (typeof body.id === 'undefined' ||
    body.id === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'id missing'
      })
    }
  }
  if (id !== body) {
    console.log('IDs differ')
    return {
      statusCode: 400
    }
  }
  let dynamodb = new AWS.DynamoDB.DocumentClient()
  const updateParams = {
    TableName: process.env.DYNAMODB_TABLENAME,
    Item: {
      id: id
    }
  }
  for (const [key, value] of Object.entries(body)) {
    updateParams.Item[key] = value
    console.log(updateParams.Item[key])
  }
  try {
    await dynamodb.put(updateParams).promise()
  } catch(error) {
    console.log('There was a problem saving to DynamoDB')
    console.log(error)
    console.log('updateParams', updateParams)
    return {
      statusCode: 500
    }
  }

  return {
    statusCode: 201
  }
}
