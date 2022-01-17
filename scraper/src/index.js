const { standard } = require('./standard_script')
const db = require('./persistence')

const main = async function(){
    await db.init()
    await standard()
    console.log('done parsing')
    db.teardown()
        .then(() => process.exit())
}

main()
