exports.getEntityList = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DcoumentClient()
  const scanParams = {
    TableName: process.env.DYNAMODB_TABLENAME
  }
  let response = {}
  try {
    response = await dynamodb.scan(scanParams).promise()
  } catch (error) {
    console.log('There was an error retrieving the item')
    console.log(error)
    console.log('scanParams', scanParams)
    return {
      statusCode: 500
    }
  }
  if (response.Count === 0) {
    return {
      statusCode: 404
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  }
}
