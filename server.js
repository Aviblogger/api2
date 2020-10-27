const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();

app.use(express.json({ extented: false}));
app.get('/', (req, res) => res.send('API running'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
   res.header("Access-Control-Allow-Methods","DELETE, PUT");
  next();
});
app.use('/api/users', require('./routers/api/users'));
app.use('/products', require('./routers/api/products'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/profile', require('./routers/api/profile'));
app.use('/api/posts', require('./routers/api/posts'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

