export interface Scripture {
  reference: string;
  text: string;
}

export interface AdultDay {
  walkCue: string;
  meditation: string;
  prompt: string | null;
  responses: string[];
}

export interface KidsResponse {
  text: string;
  correct: boolean;
}

export interface KidsDay {
  story: string;
  question: string | null;
  responses: KidsResponse[];
  prayer: string;
}

export interface Day {
  day: number;
  title: string;
  scripture: Scripture;
  adult: AdultDay;
  kids: KidsDay;
}

export interface Week {
  week: number;
  chapter: string;
  confession: string;
  theme: string;
  days: Day[];
}
