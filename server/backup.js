// function AddData(){
//     for(let i = 4; i < 5; i++){
//              console.log("Ajout de la table à la base de donnée !");
//              const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//              const data = temp;
//              const values = data.map((items, index) => {
//                      const result = `(${index}, '${items?.image}', '${items?.href}', '${items?.sticker}', ${items?.promotion}, '${items?.brand?.replaceAll(/'/g, "''")}', '${items?.title?.replaceAll(/'/g, "''")}', ${items?.price}, '${items?.size}', '${items?.photos}', '${items?.logo}', '${items?.productSizes}', '${items?.description?.replaceAll(/'/g, "''")}', '${items?.descriptionSanitized?.replaceAll(/'/g, "''")}', '${file.SheetNames[i]}')`;
//                      return result;    
//              }).toString();
//              const query = `INSERT INTO ${file.SheetNames[i]} (id, image, href, sticker, promotion, brand, title, price, size, photos, logo, productSizes, description, descriptionSanitized, category) VALUES ${values};`;
//              db.execute(query, (err) => {
//                  if(err){
//                      console.log(err);
//                  }else {
//                  console.log("Ajout de la donnée dans la table!");
//                  }
//              })
//     } 
// }
// function AddAllData(){
//     for(let i = 10; i < 11; i++){
//      const query = `CREATE TABLE ${file.SheetNames[i]} (id INT PRIMARY KEY NOT NULL, image VARCHAR(255), href VARCHAR(255), sticker VARCHAR(255), promotion INT, brand VARCHAR(255), title VARCHAR(255), price INT, size VARCHAR(255), photos VARCHAR(1024), logo VARCHAR(255), productSizes VARCHAR(255), description VARCHAR(3500), descriptionSanitized VARCHAR(3500), category VARCHAR(255))`;
//      db.execute(query, (err) => {
//             if(err){

//                  console.log(err);
//          }else {
//              console.log("Ajout de la table à la base de donnée !");
//              const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//              const data = temp;
//              const values = data.map((items, index) => {
//                      const result = `(${index}, '${items?.image}', '${items?.href}', '${items?.sticker}', ${items?.promotion}, '${items?.brand?.replaceAll(/'/g, "''")}', '${items?.title?.replaceAll(/'/g, "''")}', ${items?.price}, '${items?.size}', '${items?.photos}', '${items?.logo}', '${items?.productSizes}', '${items?.description?.replaceAll(/'/g, "''")}', '${items?.descriptionSanitized?.replaceAll(/'/g, "''")}', '${file.SheetNames[i]}')`;
//                      return result;    
//              }).toString();
//              const query = `INSERT INTO ${file.SheetNames[i]} (id, image, href, sticker, promotion, brand, title, price, size, photos, logo, productSizes, description, descriptionSanitized, category) VALUES ${values};`;
//              db.execute(query, (err) => {
//                  if(err){
//                      console.log(err);
//                  }else {
//                  console.log("Ajout de la donnée dans la table!");
//                  }
//              })
//          }
//      })

//     } 
// }