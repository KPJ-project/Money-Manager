/*

module.exports 가 의미하는 것은, module.exports 변수에 할당되어 있는 함수들을
다른 곳에서도 require를 이용해서 사용하고 싶을 때 
다음과 같이 지정하여 사용을 한다.

*/

var multer = require('multer');
var upload = multer({dest: 'image/'})


module.exports = function(app, MoneyManager){
    
    app.post('/upload', upload.single('img'), function(req, res){
        res.send('success' + req.file);
        console.log(req.file);
    });


    // GET ALL List
    app.get('/api/list', function(req, res){
        MoneyManager.find.sort({"date": -1}, function(err, records){
            if(err){
                return res.status(500).send({error: 'database fail'});
            }

            console.log("kwon");
            res.json(records);
        })
    });

    //지출
    app.get('/api/list/cost', function(req, res){
        MoneyManager.find({"cost": true}, function(err, records){
            if(err){
                return res.status(500).send({error: 'database fail'});
            }

            console.log("kwon");
            res.json(records);
        })
    });
    
    //월별 지출
    app.get('/api/list/cost/:month/:year', function(req, res){

        var start =req.params.year + "-" + req.params.month + "-" + "01"
        
        if(req.params.month == 4 || req.params.month == 6 || req.params.month == 9 || req.params.month == 11 )
        {
            var end =req.params.year + "-" + req.params.month + "-" + "30T23:59:59"
        }
        else if(req.params.month == 2)
        {
            var end =req.params.year + "-" + req.params.month + "-" + "28T23:59:59"
        }
        else{
            var end =req.params.year + "-" + req.params.month + "-" + "31T23:59:59"
        }

        var start_date = new Date(start).toISOString();
        var end_date = new Date(end).toISOString();

        console.log(start_date);
        console.log(end_date);

        MoneyManager.find({"cost":true, "date":{"$gte":start_date, "$lt":end_date }}, function(err, records){
            if(err){
                console.log(err);
                return res.status(500).send({error: 'database fail'});
            }

            res.json(records); 
        })
    });

    //수입
    app.get('/api/list/income', function(req, res){
        MoneyManager.find({"cost":false}, function(err, records){
            if(err){
                return res.status(500).send({error: 'database fail'});
            }

            console.log("kwon");
            res.json(records);
        })
    });


    //월별 수입
    app.get('/api/list/income/:month/:year', function(req, res){

        var start =req.params.year + "-" + req.params.month + "-" + "01"
        
        if(req.params.month == 4 || req.params.month == 6 || req.params.month == 9 || req.params.month == 11 )
        {
            var end =req.params.year + "-" + req.params.month + "-" + "30T23:59:59"
        }
        else if(req.params.month == 2)
        {
            var end =req.params.year + "-" + req.params.month + "-" + "28T23:59:59"
        }
        else{
            var end =req.params.year + "-" + req.params.month + "-" + "31T23:59:59"
        }

        var start_date = new Date(start).toISOString();
        var end_date = new Date(end).toISOString();

        console.log(start_date);
        console.log(end_date);

        MoneyManager.find({"cost":false, "date":{"$gte":start_date, "$lt":end_date }}, function(err, records){
            if(err){
                console.log(err);
                return res.status(500).send({error: 'database fail'});
            }

            res.json(records); 
        })
    });

    //통계
    app.get('/api/list/stat', function(req, res){
        MoneyManager.find({"cost":false}, function(err, records){
            if(err){
                return res.status(500).send({error: 'database fail'});
            }

            console.log("kwon");
            res.json(records);
        })
    });  

    //POST records
    app.post('/api/create', upload.single('receipt_img'), function(req, res){
        var money = new MoneyManager();
        money.date = new Date(req.body.date);
        money.category = req.body.category;
        money.contents = req.body.contents;
        money.price = req.body.price;
        money.etc = req.body.etc;
        money.cc = req.body.cc;
        //money.receipt_img = req.file.path;
        money.cost = req.body.cost;

        money.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return ;
            }
            res.json(
                {
                    result: 1
                }
            );
        });
    });

    app.get('/api/list/:id', function(req, res){
        MoneyManager.findOne({_id: req.params.id}, function(err, moneymanager){
            if(err) return res.status(500).json({error: err});

            if(!moneymanager) return res.status(404).json({error:"book no"})
            res.json(moneymanager);
        });

    });

    //삭제
    app.delete('/api/delete/:id', function(req, res){
        MoneyManager.remove({_id: req.params.id}, function(err, moneymanager){
            if(err) return res.status(500).json({error: err, result:1});

            // if(!moneymanager.result.n) return res.status(404).json({error:"book no"})
            // res.json({message: "book deleted"})

            res.json({message: "list deleted", result: 1})
        });
    });

    app.put('/api/update/:id', function(req, res){
        MoneyManager.update({ _id: req.params.id }, { $set: req.body }, function(err, output){
            console.log(req.body)
            console.log(output)
            if(err) res.status(500).json({ error: 'database failure', result: 0 });
            console.log(output);
            res.json( { message: 'list updated', result: 1 } );
        })
    });



    //RETRIEVE 
    // //PUT Update
    // app.put('api/update/:id', function(req, res){
    //     moneymanager.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err){
    //         console.log(req.body)
    //         if (err){
    //             res.json({result: 0});
    //             return ;
    //         }
    //         res.json(
    //             {
    //                 result: 1
    //             }
    //         );
    //     });
    // });

    // //DELETE delete
    // app.delete('api/delete/:id', function(req, res){
    //     console.log(req);
    //     console.log(res);
    // });
}
