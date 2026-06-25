import express from 'express';
import { connectDatabase, mongoUri } from './database.js';
import { User, Team, Activity, Leaderboard, Workout } from './models.js';

const app = express();
const port = 8000;
const host = process.env.HOST ?? '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = process.env.API_URL ?? (codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running.',
    apiUrl,
    environment: {
      host,
      port,
      codespaceName: codespaceName ?? null,
    },
  });
});

app.get('/api/users/', async (req, res) => {
  const users = await User.find().select('name email role joinedAt teamIds').lean();
  res.json({ users });
});

app.get('/api/teams/', async (req, res) => {
  const teams = await Team.find().select('name description memberIds totalPoints createdAt').lean();
  res.json({ teams });
});

app.get('/api/activities/', async (req, res) => {
  const activities = await Activity.find().select('userId type distanceKm durationMinutes caloriesBurned date').lean();
  res.json({ activities });
});

app.get('/api/leaderboard/', async (req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).select('rank userId userName points teamName').lean();
  res.json({ leaderboard });
});

app.get('/api/workouts/', async (req, res) => {
  const workouts = await Workout.find().select('title description durationMinutes difficulty focusArea').lean();
  res.json({ workouts });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, host, () => {
      console.log(`Backend listening on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
