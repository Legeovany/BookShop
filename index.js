import express from "express"
import exphbs from "express-handlebars"
import pool from './db/conn.js';

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('home')
})


app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const query = `INSERT INTO books_table (??, ??) VALUES (?, ?)`
    const data = ['title', 'pagesqty', title, pagesqty]

    pool.query(query, data, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})


app.get('/books', (req, res) => {
    const query = "SELECT * FROM books_table"

    pool.query(query, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const books = data
        console.log(books)

        res.render('books', {books})
    })
})


app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM books_table WHERE ?? = ?`

    const data = ['id', id]

    pool.query(query, data, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', {book})
    })

})

app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM books_table WHERE ?? = ?`

    const data = ['id', id]

    pool.query(query, data, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', {book})
    })

})


app.post('/books/updatebook', (req, res) => {

    const title = req.body.title
    const pagesqty = req.body.pagesqty
    const id = req.body.id

    const query = `UPDATE books_table SET ?? = ?, ?? = ? WHERE ?? = ?`

    const data = ['title', title, 'pagesqty', pagesqty, 'id', id]

    pool.query(query, data, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})


app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id

    const query = `DELETE FROM books_table WHERE ?? = ?`

    const data = ['id', id]

    pool.query(query, data, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})


app.listen(3000, function(err) {
    if(err){
        console.log(err)
    }

    console.log("Connection Established!")
})