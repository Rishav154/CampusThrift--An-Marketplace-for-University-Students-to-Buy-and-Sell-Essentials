const mongoose = require('mongoose');

async function connectToDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)

        if (connection.STATES.connecting) {
            console.log(`Connecting DB to ${connection.connection.host}`);
        }

        if (connection.STATES.connected) {
            console.log(`DB Connected to ${connection.connection.host}`);
        }

        if (connection.STATES.disconnected) {
            console.log(`DB Disconnected`);
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDB;
