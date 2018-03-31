const router = require('express').Router();
const Money = require('../models/server');

router.get('/', (req, res) => {
    console.log('start get');
    Money.findAll()
        .then((moneys) => {
            if (!moneys.length) return res.status(404).send({ err: 'Money not found' });
            res.send(`find successfully: ${moneys}`);
        })
        .catch(err => res.status(500).send(err));
});


router.get('/moneyid/:moneyid', (req, res) => {
    console.log(req.params.moneyid);
    Money.findOneByMoneyid(req.params.moneyid)
        .then((money) => {
            console.log(money);
            if (!money) return res.status(404).send({ err: 'Money not found' });
            res.send(`findOne successfully: ${money}`);
        })
        .catch(err => res.status(500).send(err));
});


router.post('/', (req, res) => {
    console.log('start create');
    Money.create(req.body)
        .then(money => res.send(money))
        .catch(err => res.status(500).send(err));
});


router.put('/moneyid/:moneyid', (req, res) => {
    console.log(req.body);
    Money.updateByMoneyid(req.params.moneyid, req.body).then(money =>console.log(money)).catch(err => res.status(500).send(err));
});


router.delete('/moneyid/:moneyid', (req, res) => {
    Money.deleteByMoneyid(req.params.moneyid)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;