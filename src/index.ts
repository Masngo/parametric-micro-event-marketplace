import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import policyRoutes from './routes/policy.routes';
import engineRoutes from './routes/engine.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Establish Database Connection
connectDB();

// Mount Routes
app.use('/api/policies', policyRoutes);
app.use('/api/engine', engineRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Marketplace Engine listening at http://localhost:${PORT}`);
});
