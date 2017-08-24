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
	
	   fetchAll (req, res) {
		 let cur_page =req.body.cur_page;
		 let goods_typename =req.body.goods_typename;
		  let sql, arr ,endLimit ,startLimit;
		
		console.log(req.body.cur_page);
		pool.getConnection(function (err, connection) {
			
			 endLimit = cur_page *10;
			 startLimit =  endLimit -10;
			if(goods_typename){
				
					 sql ='select * from goodstype where goods_typename =? ';
					 arr = [goods_typename];
				    
			}else{
				
				sql ='select * from goodstype  limit ?, ?';
				   arr = [startLimit , endLimit];
			}
		
			connection.query(sql,arr, function (err, rows) {

			console.log(rows);
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', resultList: rows});
        });
    })},
	
	
	
	
	
	
	// 获取详情
	fetchById(req, res) {
		let id = req.body.id;


		pool.getConnection(function (err, connection) {
			var sql = 'select * from goodstype WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {

				rows = formatData(rows);
				res.json({
					code: 200,
					msg: 'ok',
					resultList: rows[0]
				});
			});

		})
	},

	// 添加|更新 会员
	addOne(req, res) {
		let id = req.body.id;
		console.log(id);

		let goods_typename = req.body.goods_typename;
		let remarks = req.body.remarks;

		let sql, arr;


		pool.getConnection(function (err, connection) {

			if (id) {
				// 更新
				sql = 'UPDATE goodstype SET goods_typename=?, remarks=? WHERE id=?';

				arr = [goods_typename, remarks,  id];
			} else {
				// 新增
				sql = 'INSERT INTO goodstype(goods_typename, remarks) VALUES(?,?)';
				arr = [goods_typename, remarks, remarks];


			}

			connection.query(sql, arr, function (err, rows) {

				res.json({
					code: 200,
					msg: 'done'
				});


			})
		})





	},


	// 删除类型

	deleteOne(req, res) {

		let id = req.body.id;
		pool.getConnection(function (err, connection) {
			var sql = 'DELETE  from goodstype WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {

				res.json({
					code: 200,
					msg: 'done'
				});
			});

		})
	},








	

};
