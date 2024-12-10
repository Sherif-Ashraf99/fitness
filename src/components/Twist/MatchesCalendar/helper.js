export const convertedData = (params) => {
  const { data, sport_id, team_id } = params;

  if (sport_id === 7) {
    let customizedData = {};
    for (const dayMatches in data) {
      const customizedDayMatches = data?.[dayMatches].map((match) => {
        match.sport_id = 7;
        match.services = [10];
        return match;
      });
      customizedData = {
        ...customizedData,
        [dayMatches]: customizedDayMatches,
      };
    }
    return customizedData;
  }

  if (team_id) {
    const { today, next, previous } = data;
    return { yesterday: previous, today, tomorrow: next };
  }

  let sortedDataByRank = {};
  for (const dayMatches in data) {
    const sortedDayMatches = data[dayMatches]?.sort((a, b) => b.rank - a.rank);
    sortedDataByRank = { ...sortedDataByRank, [dayMatches]: sortedDayMatches };
  }
  const liveMatches = data?.today?.filter((match) => match.matchStatus === 2);
  const customizedData = { ...sortedDataByRank, liveMatches };
  return customizedData;
};
