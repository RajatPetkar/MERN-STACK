const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mernstack').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});
