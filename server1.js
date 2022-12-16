import { randomUUID } from 'crypto'
import { createServer } from 'http'
import { parse } from 'url'

const PORT = 3000

const handler = async (request, response) => {
  if (request.method === 'GET' && request.url.includes('products')) {
    const {
      query: { productName },
    } = parse(request.url, true)

    const result = { id: randomUUID(), product: productName }

    return response.end(JSON.stringify(result))
  }

  return response.end('hey')
}

createServer(handler).listen(PORT, () => {
  console.log(`Product API is running on port ${PORT}`)
})
