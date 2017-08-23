let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');
let mysql = require('mysql');

let db = require('../configs/db');
let pool = mysql.createPool(db);

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

		pool.getConnection(function (err, connection) {
			var sql = 'select * from user ';
			connection.query(sql, function (err, rows) {

				rows = formatData(rows);
				res.json({
					code: 200,
					msg: 'ok',
					users: rows
				});
			});

		})
	},

	// 添加用户
	addOne(req, res) {
		let name = req.body.name;
		let pass = req.body.pass;
		let role = req.body.role;

		pool.getConnection(function (err, connection) {

			let sql = 'INSERT INTO user(user_name, password,role) VALUES(?,?,?)';
			let arr = [name, pass, role];

			connection.query(sql, arr, function (err, rows) {

				res.json({
					code: 200,
					msg: 'done'
				});
			})
		})
	},



	// 删除用户

	deleteOne(req, res) {

		console.log(req.body);
		let id = req.body.id;


		pool.getConnection(function (err, connection) {
			var sql = 'DELETE  from user WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {

				res.json({
					code: 200,
					msg: 'done'
				});
			});

		})
	},






	// 批量删除
	deleteMulti(req, res) {
		let id = req.body.id;

		console.log(id);
		pool.getConnection(function (err, connection) {

			let sql = 'DELETE  from user WHERE id in ?';
			let arr = [[id]];
			connection.query(sql, arr, function (err, rows) {


				res.json({
					code: 200,
					msg: 'done'
				});
			});

		})
	},

	// 登录
	login(req, res) {


		let user_name = req.body.user_name;
		let password = req.body.password;

		console.log("user_name", user_name)
		pool.getConnection(function (err, connection) {
			var sql = 'select * from user WHERE user_name = ' + connection.escape(user_name);
			connection.query(sql, function (err, rows) {

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



				//				bcrypt.compare(password, pass, function (err, sure) {
				//					if (sure) {
				//						let user = {
				//							user_id: rows[0].id,
				//							user_name: rows[0].user_name,
				//							role: rows[0].role,
				//						};
				//
				//						req.session.login = user;
				//
				//						res.json({
				//							code: 200,
				//							msg: '登录成功',
				//							user: user
				//						});
				//					} else {
				//						res.json({
				//							code: 400,
				//							msg: '密码错误'
				//						});
				//					}
				//				});
				//


				//1.微信活动配置
				//
				//
				//
				//2.微信H5页面配置
				// 模块的主要功能为 减少以前开发模式的多余性，提高超市活动的开发效率 。按照以往的项目经历，超市需要推广活动就需要开发一次，
				// 而此模块功能只需要简单的操作配置就可以生成一个活动的源码，大大减少了开发量，提高了代码的可复用性，
				//



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

		pool.getConnection(function (err, connection) {
			var sql = 'UPDATE user SET role= ' + connection.escape(change_role) + 'WHERE id = ' + connection.escape(user_id);
			connection.query(sql, function (err, rows) {

				console.log(rows);
				if (rows.affectedRows) {
					res.json({
						code: 200,
						msg: 'done'
					});
				}
			});

		})
	},

};
