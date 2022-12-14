const express = require('express')
const { Router } = express
const routerProducts = Router()
const containerApi = require ('./src/containerApi')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index', { products });
});

app.use('/api/products', routerProducts)


const products = []
let api = new containerApi(products)

routerProducts.get('/', (req, res) => {
    res.render('products', { products })
})

routerProducts.post('/', (req, res) => {
    api.addProduct(req, res);
})

routerProducts.get('/:id', (req, res) => {
    api.getProduct(req, res);
})

routerProducts.put('/:id', (req, res) => {
    api.modifyProduct(req, res);
})

routerProducts.delete('/:id', (req, res) => {
    api.deleteProduct(req, res);
})



const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))
