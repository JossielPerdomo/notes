const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB);

        console.log('Succesful connection')
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing database');
    }

}

module.exports = {
    dbConnection
}