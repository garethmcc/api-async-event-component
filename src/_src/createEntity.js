exports.createEntity = async (event, context) => {
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
  let dynamodb = new AWS.DynamoDB.DocumentClient()
  const createParams = {
    TableName: process.env.DYNAMODB_TABLENAME,
    Item: {
      id: body.id
    }
  }
  for (const [key, value] of Object.entries(body)) {
    if (key !== 'id') {
      createParams.Item[key] = value
      console.log(createParams.Item[key])
    }
  }
  try {
    await dynamodb.put(createParams).promise()
  } catch(error) {
    console.log('There was a problem saving to DynamoDB')
    console.log(error)
    console.log('createParams', createParams)
    return {
      statusCode: 500
    }
  }

  return {
    statusCode: 201
  }
}
