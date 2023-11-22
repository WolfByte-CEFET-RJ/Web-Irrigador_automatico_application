function GenSeed (id) {
  id++;
  const date = new Date();

  const prefix = String(date.getFullYear()) + String(date.getMonth()+1);

  const string = '000000' + String(((id/5) * 10 << 8) + ((id/5) * 10 << 4) + ((id/5) * 10 << 2) + ((id/5) * 10 << 1));
  
  const idN = parseInt(prefix + string.replace(/\-/g, '').slice(-5));

  return idN + Math.pow(String(idN).length, 5);

}

module.exports = GenSeed;