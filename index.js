require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route')
const authLogin = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
var productRoute = require('./routes/product.route');
const db = require('./db')


const authMiddleware = require('./middleware/auth.middleware')

const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    // Khai báo public file statics 
app.use(express.static('public'))
app.use(cookieParser(process.env.SECRET_SIGN_COOKIE))

app.get('/', (req, res) => res.render('index', {
    name: 'Bạn'
}));
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', productRoute);
app.use('/auth', authLogin);


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));