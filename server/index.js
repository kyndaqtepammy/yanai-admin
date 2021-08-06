var express  = require('express');
var app = express();
var login = require('./routes/routes.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();


router.get('/', cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    res.json(
        {
            message: "Hello world"
        }
    )
});

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null ,   Date.now()+ "_" +file.originalname);
    }
});
var upload = multer({storage: storage});
router.post('/uploads', upload.any(), login.uploads);
router.get('/books', login.books);

//router.post('/uploads', upload.single('myFile'), login.uploads);
app.use('/api', router);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.listen(5001);