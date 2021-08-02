const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{res.json({msg:"Holi la api funciona correctamente"})});


module.exports = router;