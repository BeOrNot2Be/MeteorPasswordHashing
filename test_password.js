var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://18.217.199.157:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
var dbName = 'terva';
var bcrypt = require('bcrypt');
var sha256 = require('sha256');

connectDb(url).then(function(client) {
	var db = client.db(dbName);

	var users = db.collection('users');
	users.findOne({ 'emails.0.address': 'tim@farmlandfinder.com' }, function(err, user) {
		console.log('USER', user, err, 'tim@farmlandfinder.com', '0932801753Tt');
		if (err) { console.log(err) };

		if (!user) {console.warn('WrongUsernameOrPasswordError tim@farmlandfinder.com') };

		bcrypt.compare(sha256('0932801753Tt'), user.services.password.bcrypt, function(err, isValid) {
			console.log('IS VALID', isValid);
			if (err) {
				console.log(err);
			} else if (!isValid) {
				console.warn('WrongUsernameOrPasswordError tim@farmlandfinder.com');
			} else {
				console.log(null, user);
			}
		});
	});
});

function connectDb(url) {
	return new Promise((resolve, reject) => {
		MongoClient.connect(url, (err, client) => {
			if (err) reject(err);
			resolve(client);
		});
	});
}
