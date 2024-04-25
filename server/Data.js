const reader = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../data/LBO.xlsx');
const file = reader.readFile(filePath);
 const sheets = file.SheetNames;

 let data = [];
for(let i=1; i < sheets.length; i++){
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    data.push({data: temp, name: file.SheetNames[i]});
}

// const displayresult = () => console.log("temp", temp[1].image);

module.exports = {data};
