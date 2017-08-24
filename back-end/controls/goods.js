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
		 let cur_page =req.body.cur_page;
		 let goods_name =req.body.goods_name;
		  let sql, arr ,endLimit ,startLimit;
		
		console.log(req.body.cur_page);
		pool.getConnection(function (err, connection) {
			
			 endLimit = cur_page *10;
			 startLimit =  endLimit -10;
			if(goods_name){
				
					 sql ='select * from goods where goods_name =?';
					 arr = [goods_name];
				    
			}else{
				
				sql ='select * from goods  limit ?, ?';
				   arr = [startLimit , endLimit];
			}
		
			connection.query(sql,arr, function (err, rows) {

			console.log(rows);
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', resultList: rows});
        });
    })},

    // 获取商品详情
    fetchById (req, res) {
        let id = req.body.id;
     
		pool.getConnection(function (err, connection) {
			var sql = 'select * from goods WHERE id = ' + connection.escape(id);
			connection.query(sql, function (err, rows) {
		
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', resultList: rows[0]});
        });

    })},

    // 添加|更新 商品
    addOne (req, res) {
        let id = req.body.id;
        console.log(id);
        let goods_name = req.body.goods_name;
        let goods_price = req.body.goods_price;
        let sql, arr;
		
	pool.getConnection(function (err, connection) {

        if (id ) {
            // 更新
            sql = 'UPDATE goods SET goods_name=?, goods_price=? WHERE id=?';
            arr = [goods_name, goods_price, id];
        } else {
            // 新增
            sql = 'INSERT INTO goods(goods_name, goods_price) VALUES(?,?)';
            arr = [goods_name, goods_price];
			
        }	
		connection.query(sql,arr, function (err, rows) {

			console.log("err",err);
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
        let absolutePath = path.resolve(__dirgoods_name, req.file.path);
        let a  = 2;

        func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60], (err, rows) => {
            console.log(a);
            res.send({code: 200, msg: 'done', url: absolutePath});
        }, res);
    },
};