import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const sharedComponentsContext = createContext();

const SharedContext = ({ children }) => {
  const [initialSharedValues, setInitialSharedValues] = useState({
    subscriptionServiceName: "",
    NewsSearchQuery: [],
    seasonInfo: {
      seasons: [],
      activeSeason: { id: null },
      appActiveSeason: { id: null },
    },
    matchInfo: {},
    matchEvents: [],
    playerDetails: {
      currentTeam: {},
      teams: [],
      currentTeamTournaments: [],
      currentTeamActiveTournament: {},
    },
    refreshSubscriptionStatus: null, // need this for just render protected components, need reimplementation in the future
  });
  const {
    NewsSearchQuery,
    seasonInfo,
    matchInfo,
    matchEvents,
    playerDetails,
    subscriptionServiceName,
  } = initialSharedValues;

  const [OlympicsTabKey, setOlympicsTabKey] = useState("");

  const [showBanner, setShowBanner] = useState(false);

  const [hasTeamCarouselData, setHasTeamCarouselData] = useState(true);

  return (
    <sharedComponentsContext.Provider
      value={{
        NewsSearchQuery,
        seasonInfo,
        matchInfo,
        matchEvents,
        playerDetails,
        subscriptionServiceName,
        setInitialSharedValues,
        OlympicsTabKey,
        setOlympicsTabKey,
        showBanner,
        setShowBanner,
        hasTeamCarouselData,
        setHasTeamCarouselData,
      }}
    >
      {children}
    </sharedComponentsContext.Provider>
  );
};

SharedContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default SharedContext;
