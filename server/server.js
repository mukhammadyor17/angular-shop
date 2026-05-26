import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

const app = express()

app.use(cors({ origin: 'http://localhost:4200' }))
app.use(express.json())

// helpers
async function getAccessToken() {
    const auth = Buffer.from(
        `${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`
    ).toString('base64')

    const tokenResponse = await  fetch(
        `${process.env.CTP_AUTH_URL}/oauth/token`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        }
    )

    const tokenData = await tokenResponse.json()
    return tokenData.access_token
}

async function commercetoolsFetch(endpoint, options = {}) {
    const token = await getAccessToken()

    const response = await fetch(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}${endpoint}`,
        {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        }
    )

    return response.json()
}

// routes
app.listen(process.env.PORT, () => {
    console.log(`Proxy server running on http://localhost:${process.env.PORT}`)
})

app.get('/api/products', async (req, res) => {
    const products = await commercetoolsFetch('/products')

    res.json(products)
})

app.get('/api/products/:id', async (req, res) => {
    const product = await commercetoolsFetch(
        `/products/${req.params.id}`
    )

    res.json(product)
})

app.get('/api/categories', async (req, res) => {
    const categories = await commercetoolsFetch('/categories')

    res.json(categories)
})

app.get('/api/search', async (req, res) => {
    try {
      const query = req.query.q

      if (!query || typeof query !== 'string') {
        return res.status(400).json({
            messagw: 'Search query is required',
        })
      }

      const params = new URLSearchParams({
        'text.en-US': query,
        fuzzy: 'true',
        limit: '20',
        staged: 'false',
      })

      const products = await commercetoolsFetch(
        `/product-projections/search?${params.toString()}`
      )

      res.json(products)
    } catch (error) {
        console.error('Search products error:', error)

        res.status(500).json({
            message: 'Failed to search products',
        })
    }
    
})

app.get('/api/cart', async (req, res) => {
    res.json({
        message: 'cart endpoint',
    })
})

app.post('/api/cart', async (req, res) => {
    res.json({
        message: 'create cart endpoint',
    })
})

app.post('/api/customers/register', async (req, res) => {
    res.json({
        message: 'register endpoint',
    })
})

app.post('/api/customers/login', async (req, res) => {
  res.json({
    message: 'login endpoint',
  })
})