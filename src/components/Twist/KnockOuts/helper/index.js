export const customizeRoundObject = (roundNum, round) => {
	const { has_group, id, matches, title } = round;
	const matchesTreePositions = [...new Array(roundNum)].map((_, i) => i + 1);
	const customRoundMatchesArr = [...new Array(roundNum)].map(
		(_, i) => `round-${roundNum * 2}-match-${i + 1}`,
	);
	let roundMatchesWithTotalScoreArr = [];

	if (matches?.length) {
		for (let position of matchesTreePositions) {
			let matchesWithSameTreePosition = matches?.filter(
				(match) => match.tree_position === position,
			);
			if (!matchesWithSameTreePosition.length) continue;
			let matchesWithTotalScore = getMatchesTotalScore(
				matchesWithSameTreePosition,
			);
			roundMatchesWithTotalScoreArr.push(matchesWithTotalScore);
		}
		for (let [index, match] of roundMatchesWithTotalScoreArr.entries())
			customRoundMatchesArr[index] = match;
	}

	const convertedRound = {
		has_group,
		id,
		matches: customRoundMatchesArr,
		title,
	};
	return convertedRound;
};

const getMatchesTotalScore = (matchesWithSameTreePosition) => {
	return matchesWithSameTreePosition?.reduce((_, currentValue) => {
		const { id, title, tree_position, home_away, team1, team2 } = currentValue;
		const addTotalScorePropertyToMatch = {
			id,
			title,
			tree_position,
			home_away,
			team1: {
				...team1,
				totalScore: team1.away_score + team1.score,
			},
			team2: {
				...team2,
				totalScore: team2.away_score + team2.score,
			},
		};
		return addTotalScorePropertyToMatch;
	}, {});
};

export const handleShowPenaltyScore = (teamOne, teamTwo) => {
	let showPenaltyScore = false;
	if (isNaN(teamOne?.score && teamTwo?.score)) return showPenaltyScore;
	if (teamOne.score !== teamTwo.score) return showPenaltyScore;
	if (
		teamOne.penalty_score + teamTwo.penalty_score > 0 ||
		teamOne.penalties_score + teamTwo.penalties_score > 0
	)
		showPenaltyScore = true;
	return showPenaltyScore;
};
