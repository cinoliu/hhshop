let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');

let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);



function formatData(rows) {
	return rows.map(row => {
		let date = moment(row.create_time).format('YYYY-MM-DD');
		return Object.assign({}, row, {
			create_time: date
		});
	});
}


module.exports = {
	// 获取商品列表
	fetchAll(req, res) {

		pool.getConnection(function (err, connection) {
			var sql = 'select * from members ';
			connection.query(sql, function (err, rows) {


				console.log(rows);
				rows = formatData(rows);
				res.json({
					code: 200,
					msg: 'ok',
					members: rows
				});
			});
		})
	},

	// 获取商品详情
	fetchById(req, res) {
		let id = req.body.id;


		pool.getConnection(function (err, connection) {
			var sql = 'select * from members WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {

				rows = formatData(rows);
				res.json({
					code: 200,
					msg: 'ok',
					members: rows[0]
				});
			});

		})
	},

	// 添加|更新 会员
	addOne(req, res) {
		let id = req.body.id;
		console.log(id);

		let member_name = req.body.member_name;
		let member_phone = req.body.member_phone;

		let remarks = req.body.remarks;
		let recommendation_code = req.body.recommendation_code;

		let membership_level = req.body.membership_level;
		let sql, arr;



		pool.getConnection(function (err, connection) {



			if (id) {
				// 更新
				sql = 'UPDATE members SET member_name=?, member_phone=?, remarks =?,recommendation_code =?，membership_level=？ WHERE id=?';

				arr = [member_name, member_phone, remarks, recommendation_code, membership_level, id];
			} else {
				// 新增
				sql = 'INSERT INTO members(member_name, member_phone,remarks,recommendation_code,membership_level) VALUES(?,?,?,?,?)';
				arr = [member_name, member_phone, remarks, recommendation_code, membership_level];


			}

			connection.query(sql, arr, function (err, rows) {

				res.json({
					code: 200,
					msg: 'done'
				});


			})
		})





	},


	// 删除会员

	deleteOne(req, res) {

		let id = req.body.id;


		pool.getConnection(function (err, connection) {
			var sql = 'DELETE  from members WHERE id = ' + connection.escape(id);
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

			let sql = 'DELETE  from members WHERE id in ?';
			let arr = [[id]];
			connection.query(sql, arr, function (err, rows) {


				res.json({
					code: 200,
					msg: 'done'
				});
			});

		})
	},



	// 权限变更
	changeRole(req, res) {
		let change_role = req.body.change_role;

		let id = req.body.id;
		
		console.log("role",change_role);

			console.log("id",id);
		
		
		pool.getConnection(function (err, connection) {
			var sql = 'UPDATE members SET membership_level= ' + connection.escape(change_role) + 'WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {



				res.json({
					code: 200,
					msg: 'done'
				});

			});

		})
	},

};
