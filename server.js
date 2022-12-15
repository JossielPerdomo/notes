const express = require('express');
const cors = require('cors');
const  exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const { dbConnection } = require('./database/config');
require('./config/passport');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //database connection
        this.connection();

        //settings
        this.settings();

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    settings() {

        this.app.set('views', path.join(__dirname, 'views'));

        this.app.engine('.hbs', exphbs.engine({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));

        this.app.set('view engine', '.hbs');
    }

    async connection() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Body parser
        this.app.use(express.json());

        this.app.use(express.urlencoded({extended:false}));

        //Method override
        this.app.use(methodOverride('_method'));

        //Session
        this.app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));

        //Passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        //Flash
        this.app.use(flash());

        //Global variables
        this.app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user;
            next();
        });

        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(require('./routes/index.routes'));
        this.app.use(require('./routes/notes.routes'));
        this.app.use(require('./routes/users.routes'));
    }

    listen() {
        this.app.listen(this.port ,() => console.log('Server running on port',this.port));
    }
}

module.exports = Server;