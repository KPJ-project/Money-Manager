
var multer = require('multer');

var _storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: _storage })


module.exports = function(app, Housekeepingbook) {
    // GET ALL DATA
    app.get('/api/data', function(req,res){
        Housekeepingbook.find({}).sort({date:-1}).exec(function(err, housekeepingbooks){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(housekeepingbooks);
        })
    });

    // GET SINGLE DATA
    //app.get('/api/data/:data_id', function(req,res){
    //    Housekeepingbook.findOne({_id: req.params.data_id}, function(err, housekeepingbook){
    //        if(err) return res.status(500).json({error: err});
    //        if(!housekeepingbook) return res.status(404).json({error: 'housekeepingbook not found'});
    //        res.json(housekeepingbook);
    //    })
    //});

    // GET YEAR DATA
    app.get('/api/data/:year', function(req,res){
        Housekeepingbook.find({ year: req.params.year
                            }).sort({ date: -1
                            }).exec(function(err, housekeepingbooks){
                                if(err) return res.status(500).send({error: 'database failure'});
                                res.json(housekeepingbooks);
                            })

    });

    // GET MONTH DATA
    app.get('/api/data/:year/:month', function(req,res){
        Housekeepingbook.find({ year: req.params.year, 
                                month: req.params.month
                            }).sort({ date: -1
                            }).exec(function(err, housekeepingbooks){
                                if(err) return res.status(500).send({error: 'database failure'});
                                res.json(housekeepingbooks);
                            })

    });

    // GET MONTH DATA (expense)
    app.get('/api/expense/:year/:month', function(req,res){
        Housekeepingbook.find({ year: req.params.year, 
                                month: req.params.month,
                                income: "false"
                            }).sort({ date: -1
                            }).exec(function(err, housekeepingbooks){
                                if(err) return res.status(500).send({error: 'database failure'});
                                res.json(housekeepingbooks);
                            })

    });

    // GET MONTH DATA (income)
    app.get('/api/expense/:year/:month', function(req,res){
        Housekeepingbook.find({ year: req.params.year, 
                                month: req.params.month,
                                income: "true"
                            }).sort({ date: -1
                            }).exec(function(err, housekeepingbooks){
                                if(err) return res.status(500).send({error: 'database failure'});
                                res.json(housekeepingbooks);
                            })

    });

    // GET MONTH DATA (STATISTICS/EXPENSE)
    app.get('/api/statistics/expense/:year/:month', function(req,res){
        console.log(req.params.month);
        var year = Number(req.params.year);
        var month = Number(req.params.month);
        
        Housekeepingbook.aggregate([
            {
                $match:{
                    month: month, 
                    year: year,
                    income: false
                }
            }, 
            {
                $group: {
                    _id: "$category", 
                    balance:{$sum: "$price"},
                    count: {$sum: 1}
                }

            },
            {
                $sort: {
                    balance: -1
                }
            }     
        ], function(err, result){
            if(err){
                console.log(err);
                return;
            }
            res.json(result);
        });
    });

    // CREATE DATA
    app.post('/api/create', upload.single('receipt'), function(req,res){
        var housekeepingbook = new Housekeepingbook();
        housekeepingbook.date = req.body.date;
        housekeepingbook.category = req.body.category;
        housekeepingbook.contents = req.body.contents;
        housekeepingbook.price = req.body.price;
        housekeepingbook.etc = req.body.etc;
        housekeepingbook.income = req.body.income;
        housekeepingbook.year = req.body.date.substring(0,4);
        housekeepingbook.month = req.body.date.substring(5,7);
        if(req.file) housekeepingbook.receipt = req.file.filename;

        housekeepingbook.save(function(err){
            if(err){
                console.error(err);
                res.json({ result: 0 });
                return;
            }
            
            res.json({ result: 1 });
        });
    });


    // UPDATE DATA
    app.post('/api/update/:housekeepingbook_id', function(req, res){
        Housekeepingbook.findById(req.params.housekeepingbook_id, function(err, housekeepingbook){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!housekeepingbook) return res.status(404).json({ error: 'housekeepingbook not found' });
    
            if(req.body.date) housekeepingbook.date = req.body.date;
            if(req.body.category) housekeepingbook.category = req.body.category;
            if(req.body.contents) housekeepingbook.contents = req.body.contents;
            if(req.body.price) housekeepingbook.price = req.body.price;
            if(req.body.etc) housekeepingbook.etc = req.body.etc;
            if(req.body.income) housekeepingbook.income = req.body.income;

            housekeepingbook.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'housekeepingbook updated'});
            });
    
        });
    
    });


    /*
    // UPDATE DATA
    app.put('/api/data/:housekeepingbook_id', function(req, res){
        Housekeepingbook.update({ _id: req.params.housekeepingbook_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json({ message: "housekeepingbook updated" });
        })
    });
    */


    // DELETE DATA
    app.delete('/api/delete/:housekeepingbook_id', function(req, res){
        Housekeepingbook.remove({ _id: req.params.housekeepingbook_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* (SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY)
            if(!output.result.n) return res.status(404).json({ error: "housekeepingbook no found" });
            res.json({ message: "housekeepingbook deleted" });
            */

            res.status(204).end();
        })
    })

}