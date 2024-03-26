import dotenv from 'dotenv';

import { app } from './src/app';

app.listen(process.env.PORT, () => {
    console.log('Server is run');
})

