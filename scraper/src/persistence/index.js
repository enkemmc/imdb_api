const mode = process.env.NODE_ENV
if (!mode){
    console.error('undetected mode')
    process.exit(1)
}
module.exports = mode === 'development' ? require('./sqlite') : require('./mysql')
