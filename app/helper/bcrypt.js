const bcrypt = require('bcrypt')
class Bcrypt {
    static hash(pwInput){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pwInput, salt)
    }
    static compare(pw, hash){
        return bcrypt.compareSync(pw, hash)
    }
}
module.exports = Bcrypt