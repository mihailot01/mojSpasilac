const pool = require('./connection');
const tabela='prijave';

const prijave = {
  insert: async function(prijava){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("INSERT INTO "+tabela+" (id_korisnika,vreme,lokacija_prijave_x, lokacija_prijave_y) VALUES (?,?,?,?)", [prijava.id_korisnika,new Date(),prijava.lokacija_prijave]);
      console.log(res); 
      if(res.affectedRows==0)
        throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  select: async function(){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela+" WHERE aktivna_prijava=1");
      //console.log(res);
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  }
}

module.exports=prijave;