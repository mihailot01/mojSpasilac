const osobe = require('../database/tabela-osobe');
const prijave=require('../database/tabela-prijave');

async function novaPrijava(req,res){
  try{
    req.body.id_korisnika=req.dekriptovan.id_korisnika;
    //console.log(req.dekriptovan.id_korisnika,req.body);
    const r=await prijave.insert(req.body);
    const id_prijave=r.insertId;
    
    if(req.body.osobe.length>0)
      osobe.insert(id_prijave,req.body.osobe);
    res.status(200).json(r);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }}

module.exports = {
  novaPrijava
};