var dummyjson = require('dummy-json');
var fs = require('fs');

var r = require('rethinkdb');

module.exports = function(cdn) {

var connection = null; 

var template = fs.readFileSync('template.hbs', {encoding: 'utf8'});
var result = JSON.parse(dummyjson.parse(template));
//var result = dummyjson.parse(template);


if(connection==null ) {
r.connect({}, function(err,conn) { 
	if(err) throw err;
	connection = conn;
console.log("Connected");

function doInsert() {

//var options =  { durability:"soft", noreply:true };
var options =  { durability:"soft"  };
//var options = {} ;

	r.table('people').insert(result['data']).run(connection, options, function(err,res) {
			if(err) throw err;
//			console.log(res);
			doInsert();

			}
			);


}

doInsert();
});
}

}

