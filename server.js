import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'

const app = express()
const db = new sqlite3.Database('./words.db')

// Middleware
app.use(cors())
app.use(express.json())

// Endpoint to get a random word from the database
app.get('/words/random', (req, res) => {
  db.get('SELECT * FROM words ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ word: row })
  })
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
