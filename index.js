const express = require('express');
const cors = require("cors");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const corsOptions = {
    origin: 'https://os.netlabdte.com',
};

app.use('/products', cors(corsOptions), (req, res) => {
    res.json({ msg: 'This is CORS-enabled for os.netlabdte.com.' });
});

app.use(`/item`, require(`./src/routes/item.route`));

app.use("/store", require("./src/routes/store.route"));

app.use("/user", require("./src/routes/user.route"));

app.use('/transaction', require('./src/routes/transaction.route'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});