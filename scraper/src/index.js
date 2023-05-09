const { standard } = require('./standard_script')
const db = require('./persistence')

const main = async function(){
  console.log('started parsing')
    await db.init()
    await standard()
    console.log('done parsing')
    db.teardown()
        .then(() => process.exit())
}

main()
