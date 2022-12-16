import axios from 'axios'

const myDB = async () =>
  new Promise((onfulfilled) =>
    onfulfilled(Array.from({ length: 9999 }, (v, k) => `${k}-isabelle.collins`))
  )

const PRODUCTS_URL = 'http://localhost:3000/products'
const CART_URL = 'http://localhost:4000/cart'

const processDBData = async () => {
  const products = await myDB()

  const responses = []

  for (const product of products) {
    const productsResponse = await axios.get(`${PRODUCTS_URL}?productName=${product}`)
    const cartResponse = await axios.post(`${CART_URL}`, productsResponse.data)

    responses.push(cartResponse.data)
  }

  return responses
}

// console.table(await processDBData())

async function* processDBDataGenerator() {
  const products = await myDB()

  for (const product of products) {
    const productsResponse = await axios.get(`${PRODUCTS_URL}?productName=${product}`)
    const cartResponse = await axios.post(`${CART_URL}`, productsResponse.data)

    yield cartResponse.data
  }
}

for await (const data of processDBDataGenerator()) {
  console.table(data)
}
