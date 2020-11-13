exports.deleteEntity = async (event, context) => {
  const id = event.pathParameters.id
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const deleteParam = {
    TableName: process.env.DYNAMODB_TABLENAME,
    Key: {
      id: id
    }
  }
  let response = {}
  try {
    response = await dynamodb.delete(deleteParam).promise()
  } catch (error) {
    console.log('There was an error deleting the item')
    console.log(error)
    console.log('deleteParam', deleteParam)
    return {
      statusCode: 500
    }
  }

  return {
    statusCode: 200
  }
}
