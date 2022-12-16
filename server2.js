import { createServer } from 'http'

const PORT = 4000

const handler = async (request, response) => {
  if (request.method === 'POST' && request.url.includes('cart')) {
    for await (const data of request) {
      const item = JSON.parse(data)

      console.log('received', item)

      response.end(`Received ${item.id}`)
    }
  }

  return response.end('hoy')
}

createServer(handler).listen(PORT, () => {
  console.log(`Product API is running on port ${PORT}`)
})
