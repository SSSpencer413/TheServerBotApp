const needle = require('needle');

exports.getList = () => {
  return new Promise ((resolve, reject) => {
    var getReq = needle.get("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, function(e, r) {
      if (!e && r.statusCode == 200) {
        resolve(r.body);
      } else {
        console.log(`${e} - ${r.statusCode}`);
        reject(e);
      }
    });
  });
}

exports.updateBalance = (body, person, table, promise) => {
  if (promise) {
    return new Promise ((resolve, reject) => {
      needle.get("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, function(e, r) {
        if (!e && r.statusCode == 200) {
          var data = r.body;
          if (data[person.id]) {
            var fdata = {}
            fdata["Credits"] = data[person.id]["Credits"];
            fdata["Credits"][table["id"]] = table["Credits"];
            fdata["Cubes"] = table.Cubes
            data[person.id] = fdata
            needle.post("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
              if (!er && re.statusCode == 200) {
                resolve(true);
              } else {
                console.log(`${er} - ${re.statusCode} food`);
                reject(false)
              }
            });
            } else {
              var fdata = {}
              fdata["Credits"] = {}
              fdata["Credits"][table.id] = table["Credits"];
              fdata["Cubes"] = table.Cubes
              data[person.id] = fdata
              needle.post("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
                if (!er && re.statusCode == 200) {
                  resolve(true);
                } else {
                  console.log(`${er} - ${re.statusCode} food`);
                  reject(false)
                }
              });
            }
          } else {
            console.log(`${e} - ${r.statusCode} bar`);
          }
      });
    });
  } else {
    needle.get("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, function(e, r) {
      if (!e && r.statusCode == 200) {
        var data = r.body;
        if (data[person.id]) {
          var fdata = {}
          fdata["Credits"] = data[person.id]["Credits"];
          fdata["Credits"][table["id"]] = table["Credits"];
          fdata["Cubes"] = table.Cubes
          data[person.id] = fdata
          needle.post("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
            if (!er && re.statusCode == 200) {
              return true;
            } else {
              console.log(`${er} - ${re.statusCode} food`);
              return false;
            }
          });
          } else {
            var fdata = {}
            fdata["Credits"] = {}
            fdata["Credits"][table.id] = table["Credits"];
            fdata["Cubes"] = table.Cubes
            data[person.id] = fdata
            needle.post("http://theserverbot.gearhostpreview.com/currency?key=?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
              if (!er && re.statusCode == 200) {
                return true;
              } else {
                console.log(`${er} - ${re.statusCode} food`);
                return false;
              }
            });
          }
        } else {
          console.log(`${e} - ${r.statusCode} bar`);
        }
    });
  }
}
