import cors from 'cors';

app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., https://finai-frontend.onrender.com
    credentials: true,              // allow cookies
    methods: ['GET','POST','PUT','DELETE'],
  })
);
