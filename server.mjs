import express from "express"
import cors from "cors";

const PORT = 3001;

const app = express()

app.use(cors())
app.use(express.json());

let products = [];


app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/product', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json({ message: 'Product added', product: newProduct });
});


app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index !== -1) {
    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = products.find(p => p.id === productId);
  
    if (product) {
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      res.json({ message: 'Product updated', product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

