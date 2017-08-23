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
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    // 获取商品列表
    fetchAll (req, res) {
		
		pool.getConnection(function (err, connection) {
			var sql = 'select * from goods ';
			connection.query(sql, function (err, rows) {
	

			console.log(rows);
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', goods: rows});
        });
    })},

    // 获取商品详情
    fetchById (req, res) {
        let id = req.body.id;

		
		pool.getConnection(function (err, connection) {
			var sql = 'select * from goods WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {
		
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', goods: rows[0]});
        });

    })},

    // 添加|更新 商品
    addOne (req, res) {
        let id = req.body.id;
        console.log(id);
        let name = req.body.name;
        let price = req.body.price;
        let sql, arr;

		
	pool.getConnection(function (err, connection) {

	
			
        if (id ) {
            // 更新
            sql = 'UPDATE goods SET name=?, price=? WHERE id=?';
            arr = [name, price, id];
        } else {
            // 新增
            sql = 'INSERT INTO goods(name, price) VALUES(?,?)';
            arr = [name, price];
			
			
        }	
			
				connection.query(sql,arr, function (err, rows) {

					res.json({
						code: 200,
						msg: 'done'
					});


				})
			})
		
		
		
	

    },


    // 删除商品
					   						   
		deleteOne(req, res) {

		let id = req.body.id;

		
			pool.getConnection(function (err, connection) {
			var sql = 'DELETE  from goods WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {
		
			res.json({
				code: 200,
				msg: 'done'
			});
		});

	})},
						   
							   
							   	 
	
	
		// 批量删除
	deleteMulti(req, res) {
		let id = req.body.id;

		console.log(id);
		pool.getConnection(function (err, connection) {

			let sql = 'DELETE  from goods WHERE id in ?';
			let arr = [[id]];
			connection.query(sql, arr, function (err, rows) {


				res.json({
					code: 200,
					msg: 'done'
				});
			});

		})
	},

	
	
	
	
	
	//图片上传
	
    uploadGoodsImg (req, res) {
        let absolutePath = path.resolve(__dirname, req.file.path);
        let a  = 2;

        func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60], (err, rows) => {
            console.log(a);
            res.send({code: 200, msg: 'done', url: absolutePath});
        }, res);
    },
};