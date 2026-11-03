export const ADJECTIVES = Object.freeze([
  'Brave',
  'Calm',
  'Clear',
  'Crisp',
  'Grand',
  'Keen',
  'Lucid',
  'Quiet',
  'Swift',
  'Vivid',
]);

export const NOUNS = Object.freeze([
  'Arc',
  'Bay',
  'Crest',
  'Drift',
  'Field',
  'Gate',
  'Glow',
  'Lake',
  'Peak',
  'Stone',
  'Vale',
  'Wind',
]);

export const MIN_POSITION = 1;
export const MAX_POSITION = ADJECTIVES.length * NOUNS.length;

function normalizedPosition(position) {
  const numericPosition = Number(position);
  const wholePosition = Number.isFinite(numericPosition)
    ? Math.round(numericPosition)
    : MIN_POSITION;

  return Math.min(MAX_POSITION, Math.max(MIN_POSITION, wholePosition));
}

export function getCodename(position) {
  const normalized = normalizedPosition(position);
  const index = normalized - MIN_POSITION;
  const adjective = ADJECTIVES[index % ADJECTIVES.length];
  const noun = NOUNS[Math.floor(index / ADJECTIVES.length) % NOUNS.length];

  return {
    position: normalized,
    adjective,
    noun,
    codename: `${adjective}${noun}`,
  };
}
