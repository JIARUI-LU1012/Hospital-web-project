const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require("cors")
const logger = require('morgan');

const ws = require('./db/socket')

const fileUpload = require('express-fileupload')

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');

app.use("/user", require('./routes/user'));
app.use("/doctor", require('./routes/doctor'));
app.use("/office", require('./routes/office'));
app.use("/order", require('./routes/order'));

app.post('/upload', (req, resp) => {
    const imageFile = req.files.file
    if(imageFile) {
        imageFile.mv('./public/' + imageFile.name)
        resp.send({ code: 0, message: 'The upload is successful', data: imageFile.name })
    }else{
        resp.send({code: 500, message: 'Upload failed',})
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    // console.log(err.message)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
