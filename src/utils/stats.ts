import { PlayerStats } from '../types';

const STATS_KEY = 'guess_the_stranger_stats_v1';

const defaultStats: PlayerStats = {
  gamesPlayed: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  highScoreClassic: 0,
  highScoreTimeAttack: 0,
  highScoreStreak: 0,
  maxStreakEver: 0,
};

export function loadStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...defaultStats };
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch {
    return { ...defaultStats };
  }
}

export function saveStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Failed to save player stats', e);
  }
}

export function resetStats(): PlayerStats {
  try {
    localStorage.removeItem(STATS_KEY);
  } catch (e) {
    console.warn('Failed to remove player stats', e);
  }
  saveStats(defaultStats);
  return { ...defaultStats };
}
