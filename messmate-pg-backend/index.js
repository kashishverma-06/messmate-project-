require('dotenv').config();

const express = require('express');
const cors = require("cors");
const morgan = require('morgan');

const app = express();

const sequelize = require('./config/db');
const Mess = require('./models/mess');

const messRoutes = require('./routes/messRoutes');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;

//------------MIDDLEWARE------------
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

//-----------ROUTES----------------

app.use('/messes', messRoutes);
app.use('/api/auth', authRoutes);

//--------------TEST ROUTE ---------
app.get('/' , (req,res)=> {
  res.send("API IS RUNNING ......");
});

//---------DB & SERVER START --------
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL connected');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synced to database');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB error:', err.message);
  });