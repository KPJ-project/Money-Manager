module.exports = function(app, Housekeepingbook) {
    // GET ALL data
    app.get('/api/data', function(req,res){
        Housekeepingbook.find(function(err, housekeepingbooks){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(housekeepingbooks);
        })
    });

    // CREATE DATA
    app.post('/api/data', function(req,res){
        var housekeepingbook = new Housekeepingbook();
        housekeepingbook.date = Date.now();
        housekeepingbook.category = req.body.category;
        housekeepingbook.contents = req.body.contents;
        housekeepingbook.price = req.body.price;
        housekeepingbook.etc = req.body.etc;

        housekeepingbook.save(function(err){
            if(err){
                console.error(err);
                res.json({ result: 0 });
                return;
            }
            
            res.json({ result: 1 });
        });
    });
}