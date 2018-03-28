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
        Housekeepingbook.find(function(err, housekeepingbooks){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(housekeepingbooks);
        })
    });

    // CREATE DATA
    app.post('/api/create', upload.single('receipt'), function(req,res){
        var housekeepingbook = new Housekeepingbook();
        housekeepingbook.date = Date.now();
        housekeepingbook.category = req.body.category;
        housekeepingbook.contents = req.body.contents;
        housekeepingbook.price = req.body.price;
        housekeepingbook.etc = req.body.etc;
        housekeepingbook.receipt = req.file.filename;

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
    app.put('/api/update/:housekeepingbook_id', function(req, res){
        Housekeepingbook.findById(req.params.housekeepingbook_id, function(err, housekeepingbook){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!housekeepingbook) return res.status(404).json({ error: 'housekeepingbook not found' });
    
            if(req.body.category) housekeepingbook.category = req.body.category;
            if(req.body.contents) housekeepingbook.contents = req.body.contents;
            if(req.body.price) housekeepingbook.price = req.body.price;
            if(req.body.etc) housekeepingbook.etc = req.body.etc;

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