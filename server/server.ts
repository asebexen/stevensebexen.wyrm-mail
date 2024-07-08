import express from 'express';
import cors from 'cors';

import createUserHandler from './route_handlers/createUser';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => res.json({message: 'Wyrm Mail'}));

app.post('/createUser', createUserHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));