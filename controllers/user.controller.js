const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = async (req, res) => {
    const users = await User.find();
    console.log(users);
    var success = req.query.success;
    res.render('indexu', {
        users, success // users: users
    });
    //res.send('Greetings from the Test controller!');
};

exports.buscar = async (req, res) => {
    var name = req.query.name;
    console.log(name)
    const users = await User.find({name: new RegExp(name, 'i')});
    res.render('buscar', {
        users, name
    });
    //res.send('Greetings from the Test controller!');
};

exports.edit = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    console.log(user);
    res.render('edit', {
        user // users: users
    });
    //res.send('Greetings from the Test controller!');
};

exports.user_create = async (req, res) => {
    var user = new User(
        req.body
        //{
            //name: req.body.name,
            //user_name: req.body.user_name,
            //email: req.body.email,
            //password: req.body.password
        //}
    );
console.log(req.body)
    await user.save(function (err) {
        if (err) {
            return next(err);
        }
        //res.send('User Created successfully')
        res.redirect('/users?success=1');
    })
};

exports.user_details = function (req, res, next) {
    User.find({});     // returns array of all users
    /*User.findById(req.params.id, 'name',  function (err, user) {
        if (err) return next(err);
        //res.send('User');
        res.send(user);
    })*/
};

exports.user_turn = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    console.log(user);
    user.active = !user.active;
    await user.save();
    res.redirect('/users')
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        //res.send('User udpated.');
        res.redirect('/users?success=1');
    });
};

exports.user_delete = async (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        //res.send('Deleted successfully!');
        res.redirect('/users');
    })
};