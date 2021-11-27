const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
const port = 3000

const authMiddleware = require("./middlewares/auth-middleware");
//db 연결
const connect = require('./schemas')
connect();

// Middleware
// ejs setting

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Router
const boardRoute = require("./routes/board");
app.use("/writeApi", boardRoute);
app.use("/listApi", boardRoute);
app.use("/updateApi", boardRoute);

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const detailRoute = require("./routes/detail");
app.use("/detail", detailRoute)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', authMiddleware, (req, res) => {
    res.render('list')
});

app.get('/write',authMiddleware, (req, res) => {
    res.render('write')
});

app.get('/detail', authMiddleware, (req, res) => {
    res.render('detail')
});

app.get('/update', authMiddleware, (req, res) => {
    res.render('update')
});

app.get('/list',authMiddleware, (req, res) => {
    res.render('list')
});

app.get('/signup',authMiddleware, (req, res) => {
    res.render('signup')
});

app.get('/signin',authMiddleware, (req, res) => {
    res.render('signin')
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});
