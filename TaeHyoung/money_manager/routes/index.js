
/*

module.exports 가 의미하는 것은, module.exports 변수에 할당되어 있는 함수들을
다른 곳에서도 require를 이용해서 사용하고 싶을 때 
다음과 같이 지정하여 사용을 한다.

*/

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

    //POST records
    app.post('/api/create', function(req, res){
        var money = new MoneyManager();
        
        money.date = new Date(req.body.date);
        money.category = req.body.category;
        money.contents = req.body.contents;
        money.price = req.body.price;
        money.etc = req.body.etc;
        money.cc = req.body.cc;

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
}
