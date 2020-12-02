const mongoose = require('mongoose');

//host:porta:banco
const connectionURL = 'mongodb://localhost:27017/work_udi'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

module.exports ={mongoose}
