import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  joinedAt: Date;
  teamIds: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'] },
  joinedAt: { type: Date, required: true, default: () => new Date() },
  teamIds: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export interface TeamDocument extends Document {
  name: string;
  description: string;
  memberIds: mongoose.Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);

export interface ActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  distanceKm: number;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() },
});

export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);

export interface LeaderboardDocument extends Document {
  rank: number;
  userId: mongoose.Types.ObjectId;
  userName: string;
  points: number;
  teamName: string;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  rank: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  points: { type: Number, required: true },
  teamName: { type: String, required: true },
});

export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
}

const workoutSchema = new Schema<WorkoutDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  focusArea: { type: String, required: true },
});

export const Workout: Model<WorkoutDocument> = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);
