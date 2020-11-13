exports.getEntity = async (event, context) => {
  const id = event.pathParameters.id
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const getParam = {
    TableName: process.env.DYNAMODB_TABLENAME,
    Key: {
      id: id
    }
  }
  let response = {}
  try {
    response = await dynamodb.get(getParam).promise()
  } catch (error) {
    console.log('There was an error retrieving the item')
    console.log(error)
    console.log('getParams', getParam)
    return {
      statusCode: 500
    }
  }
  if (typeof response.Item === 'undefined' ||
  response.Item === null) {
    return {
      statusCode: 404
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response.Item)
  }
}
