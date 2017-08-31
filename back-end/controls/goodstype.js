let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');
let path = require('path');




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
		let cur_page = req.body.cur_page;
		let goods_typename = req.body.goods_typename;
		let sql, arr, endLimit, startLimit;

		console.log(req.body.cur_page);


		endLimit = cur_page * 10;
		startLimit = endLimit - 10;
		if (goods_typename) {

			sql = 'select * from goodstype where goods_typename =? ';
			arr = [goods_typename];

		} else {

			sql = 'select * from goodstype  limit ?, ?';
			arr = [startLimit, endLimit];
		}



		func.connPool(sql, arr, (err, rows) => {
			console.log(rows);
			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows
			});
		});


	},






	// 获取详情

	fetchById(req, res) {
		let goods_type = req.body.goods_type;

		let sql = 'select * from goodstype WHERE goods_type = ?';
		let arr = [goods_type];


		func.connPool(sql, arr, (err, rows) => {

			rows = formatData(rows);
			res.json({
				code: 200,
				msg: 'ok',
				resultList: rows[0]
			});
		});


	},









	// 添加|更新 会员
	addOne(req, res) {
		let goods_type = req.body.goods_type;
	
		let goods_typename = req.body.goods_typename;
		let remarks = req.body.remarks;

		let sql, arr;




		if (goods_type) {
			// 更新
			sql = 'UPDATE goodstype SET goods_typename=?, remarks=? WHERE goods_type=?';

			arr = [goods_typename, remarks, goods_type];
		} else {
			// 新增
			sql = 'INSERT INTO goodstype(goods_typename, remarks) VALUES(?,?)';
			arr = [goods_typename, remarks, remarks];


		}


		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});


	},




	// 删除商品

	deleteOne(req, res) {

		let goods_type = req.body.goods_type;

		let sql = 'DELETE from goodstype WHERE goods_type = ?';
		let arr = [goods_type];

		func.connPool(sql, arr, (err, rows) => {
			res.json({
				code: 200,
				msg: 'done'
			});
		});

	},


};
