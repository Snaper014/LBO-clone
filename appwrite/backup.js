// fs.readFile('../data_DB/json/nouveautes.json')
//     .then((data) => {
//         const result = JSON.parse(data);
//         let value = result.at(2).data.at(0);
//         value = {
//             ...value, 
//             id: generateRandomId(), 
//             promotion: parseInt(value.promotion),
//             price: parseInt(value.price)
//         };
//         console.log(value);
//     })
//     .catch(error => console.log(error))

        // fs.readFile(`../data_DB/json/zayne_paris.json`)
        // .then( async (data) => {
        //   const result = JSON.parse(data);
          
        //   //Do something with the data
        //   for(let i = 0; i < result.at(2).data.length; i++){
        //       let value = result.at(2).data.at(i);
        //       value = {
        //               ...value, 
        //               id: generateRandomId(), 
        //               promotion: parseInt(value.promotion),
        //               price: parseInt(value.price)
        //           };
        //        await db.createDocument(
        //           process.env.DATABASE_ID,
        //           process.env.COLLECTION_ID,
        //           ID.unique(),
        //           JSON.stringify(value)
        //       )
        //       .then((response) => console.log(response))
        //       .catch((error) => console.log(error))
      
        //   }
        // })
        // .catch((error) => {
        //   console.log(error) 
        // });
