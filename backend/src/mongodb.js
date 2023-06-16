const mongoose = require('mongoose')

// 127.0.0.1
mongoose.connect('mongodb+srv://jean:20011015kiraynana@proyecto.nn5v7j5.mongodb.net/the-clean-plate?retryWrites=true&w=majority', {
    
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db => console.log('Database is connect'))
    .catch(err => console.log(err))
