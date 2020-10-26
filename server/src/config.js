import fs from 'fs'

const filePath = '/Users/zhandus/codes/eshop/shops-data/conf/dev.json'
const cfg = JSON.parse(fs.readFileSync(filePath));

export default cfg