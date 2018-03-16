

module.exports = function(app, MoneyManager){
    // GET ALL List
    app.get('/api/list', function(req, res){
        MoneyManager.find(function(err, records){
            if(err){
                return res.status(500).send({error: 'database fail'});
            }

            res.json(records);
        })
    });

    app.post('/api/create', function(req, res){
        var money = new MoneyManager();
        
        money.date = new Date(req.body.date);
        money.category = req.body.category;
        money.contents = req.body.contents;
        money.price = req.body.price;
        money.etc = req.body.etc;
        money.cc = req.body.cc;
        console.log(money.date)

        money.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return ;
            }

            res.json({result: 1});
        });
    });


}
