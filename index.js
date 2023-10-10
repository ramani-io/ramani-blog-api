const express = require('express')
const app = express()
const port = 4040

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Ramani Blog listening on port ${port}`)
})

