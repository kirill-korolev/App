var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.use('/blocks', express.static('blocks'));
app.use('/db', express.static('db'));

app.get('/', function(req, res)
{
	res.render('index');
});

/*app.get('/menu', function(req, res)
{
	var data = {
		name: req.params.name,
		age:29,
		job:"ninja",
		hobbies:['eating', 'fishing', 'fighting']
	};
	res.render('profile', {person:data});

	res.render('menu');
});
*/

app.listen(8080);
