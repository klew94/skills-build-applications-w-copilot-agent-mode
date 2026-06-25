import mongoose from 'mongoose';
import { User, Team, Activity, Leaderboard, Workout } from '../models.js';

// Seed the octofit_db database with test data.
async function seed() {
  const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

  console.log('Connecting to MongoDB:', mongoUri);
  await mongoose.connect(mongoUri);

  console.log('Clearing existing collections...');
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  console.log('Creating users...');
  const users = await User.create([
    { name: 'Avery Harper', email: 'avery@example.com', role: 'athlete' },
    { name: 'Jordan Lee', email: 'jordan@example.com', role: 'coach' },
    { name: 'Marin Patel', email: 'marin@example.com', role: 'athlete' },
  ]);

  console.log('Creating teams...');
  const teams = await Team.create([
    {
      name: 'OctoRunners',
      description: 'A fast-paced team focused on weekly running challenges.',
      memberIds: [users[0]._id, users[2]._id],
      totalPoints: 4760,
    },
    {
      name: 'FitSquad',
      description: 'Strength and recovery athletes aiming for balanced performance.',
      memberIds: [users[1]._id],
      totalPoints: 3420,
    },
  ]);

  console.log('Creating activities...');
  await Activity.create([
    {
      userId: users[0]._id,
      type: 'running',
      distanceKm: 12.5,
      durationMinutes: 65,
      caloriesBurned: 820,
      date: new Date('2026-06-15T07:30:00Z'),
    },
    {
      userId: users[0]._id,
      type: 'swimming',
      distanceKm: 1.2,
      durationMinutes: 40,
      caloriesBurned: 420,
      date: new Date('2026-06-17T08:15:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'cycling',
      distanceKm: 28.7,
      durationMinutes: 92,
      caloriesBurned: 1080,
      date: new Date('2026-06-16T06:45:00Z'),
    },
  ]);

  console.log('Creating leaderboard entries...');
  await Leaderboard.create([
    { rank: 1, userId: users[0]._id, userName: users[0].name, points: 2240, teamName: 'OctoRunners' },
    { rank: 2, userId: users[2]._id, userName: users[2].name, points: 1980, teamName: 'OctoRunners' },
    { rank: 3, userId: users[1]._id, userName: users[1].name, points: 1740, teamName: 'FitSquad' },
  ]);

  console.log('Creating workouts...');
  await Workout.create([
    {
      title: 'Cardio Charge',
      description: 'High-energy interval training to improve stamina and speed.',
      durationMinutes: 45,
      difficulty: 'intermediate',
      focusArea: 'cardio',
    },
    {
      title: 'Recovery Stretch',
      description: 'Low-impact mobility and flexibility routine for rest days.',
      durationMinutes: 30,
      difficulty: 'beginner',
      focusArea: 'mobility',
    },
    {
      title: 'Strength Sprint',
      description: 'Power-building circuit with emphasis on lower body strength.',
      durationMinutes: 55,
      difficulty: 'advanced',
      focusArea: 'strength',
    },
  ]);

  console.log('Seed the octofit_db database with test data: completed successfully.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
