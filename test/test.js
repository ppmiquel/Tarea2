var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var app = require('../app');
chai.should();
//var a = require('../api/controllers/instagramController');
describe('testing api',function(){
	/*it('Should give Error 400',function(){
		chai.request(app).post('/instagram/tag/buscar').end(function(err,res){
			res.should.have.status(400);
		})
	})*/
})