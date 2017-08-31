let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');
let mysql = require('mysql');



function formatData(rows) {
	return rows.map(row => {
		let date = moment(row.create_time).format('YYYY-MM-DD');
		let obj = {};

		switch (row.role) {
			case 1:
				obj.role = '普通用户';
				break;
			case 10:
				obj.role = '管理员';
				break;
			case 100:
				obj.role = '超级管理员';
		}

		delete row.password;

		return Object.assign({}, row, {
			create_time: date
		}, obj);
	});
}


module.exports = {

	fetchAll(req, res) {
		
		 let cur_page =req.body.cur_page;
		  let sql, arr ,endLimit ,startLimit;
		
		

	
				 endLimit = cur_page *10;
			 startLimit =  endLimit -10;
			
			
				sql ='select * from user  limit ?, ?';
				   arr = [startLimit , endLimit];
			
		
		
		
		func.connPool(sql, arr, (err, rows) => {
			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows
			});

		});
		
		


	
	},

	// 添加用户
	addOne(req, res) {
		let name = req.body.name;
		let pass = req.body.pass;
		let role = req.body.role;

		

		let sql = 'INSERT INTO user(user_name, password,role) VALUES(?,?,?)';
		let arr = [name, pass, role];

		
		
		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});

		});
		
		
	
		
	},



	// 删除用户

	deleteOne(req, res) {

		let id = req.body.id;

		var sql = 'DELETE  from user WHERE id =? ' ;
		
		let arr = [id];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});

	},





	// 批量删除

		deleteMulti(req, res) {
		let id = req.body.id;

		let sql = 'DELETE  from user WHERE id in ?';
		let arr = [[id]];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});



	},

	
	
	
	
	
	
	
	

	// 登录
	login(req, res) {


		let user_name = req.body.user_name;
		let password = req.body.password;

		console.log("user_name", user_name)
		
			let sql = 'select * from user WHERE user_name = ? ';
		
			let arr = [user_name];
		
			func.connPool(sql, arr, (err, rows) => {
				if (!rows.length) {

					res.json({
						code: 400,
						msg: '用户名不存在'
					});
					return;
				}


				let pass = rows[0].password;


				let user = {
					user_id: rows[0].id,
					user_name: rows[0].user_name,
					role: rows[0].role,
				};

				req.session.login = user;

				res.json({
					code: 200,
					msg: '登录成功',
					user: user
				});


		});
		
		
		
		



	},


	// 自动登录
	autoLogin(req, res) {
		let user = req.session.login;
		if (user) {
			res.json({
				code: 200,
				msg: '自动登录',
				user: user
			});

		} else {
			res.json({
				code: 400,
				msg: 'not found'
			});
		}
	},

	// 注销
	logout(req, res) {
		req.session.login = null;

		res.json({
			code: 200,
			msg: '注销'
		});
	},

	// 权限控制
	controlVisit(req, res, next) {
		if (req.session.login.role && req.session.login.role < 10) {
			res.json({
				code: 400,
				msg: '权限不够'
			});
			return;
		}

		next();
	},

	// 权限变更
	changeRole(req, res) {
		let role = req.session.login.role;
		let change_role = req.body.change_role;

		if (role !== 100 && change_role === 100) {
			res.json({
				code: 400,
				msg: '权限不够'
			});
			return;
		}

		let user_id = req.body.id;	

		let sql = 'UPDATE user SET role= ? WHERE id =?';
		let arr = [change_role,user_id];

		func.connPool(sql, arr, (err, rows) => {
			if (rows.affectedRows) {
					res.json({
						code: 200,
						msg: 'done'
					});
				}
		});

		
	},
	
	

	
	
	
	
	
	
	

};
