export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ResultItem {
  id: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  clientName: string;
  industry: string;
  image: string;
}

export const getTeam = (): TeamMember[] => {
  const data = localStorage.getItem('skillhive_team');
  return data ? JSON.parse(data) : [];
};

export const saveTeam = (team: TeamMember[]) => {
  localStorage.setItem('skillhive_team', JSON.stringify(team));
  // Dispatch a custom event so other components can update
  window.dispatchEvent(new Event('teamUpdated'));
};

export const getResults = (): ResultItem[] => {
  const data = localStorage.getItem('skillhive_results');
  return data ? JSON.parse(data) : [];
};

export const saveResults = (results: ResultItem[]) => {
  localStorage.setItem('skillhive_results', JSON.stringify(results));
  // Dispatch a custom event so other components can update
  window.dispatchEvent(new Event('resultsUpdated'));
};
