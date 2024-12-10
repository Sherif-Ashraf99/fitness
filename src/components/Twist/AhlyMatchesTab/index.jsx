import styles from './index.module.css'
import CustomDropdown from 'src/components/Twist/shared/CustomDropdown';
import CustomCalendar from 'src/components/Twist/shared/CustomCalendar';
import MatchesList from 'src/components/Twist/shared/MatchesList';
import Barloader from "react-spinners/BarLoader"
import apis from 'src/services/Twist'
import { useEffect, useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';
import { filterMatchesData } from 'src/pages/Twist/Matches/utils';


const matchesApiFn = (params) => apis.match.getMatches(params)
const macthesDaysApiFn = (params) => apis.match.getBusyDays(params)


const AhlyMatchesTab = ({ teamData }) => {

    const { pathname } = useLocation();

    const activeTournaments = teamData?.tournaments?.filter(tournament => tournament?.id)

    const date = new Date()
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(date)
    const [matches, setMatches] = useState([])
    const [filters, setFilters] = useState({ tournament: { id: "showAll", name: "كل البطولات" } })


    const apiInitialParams = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        tournament_id: filters.tournament.id === "showAll" ? null : filters.tournament.id
    }
    const apiParams = useRef(apiInitialParams)

    const { data: matchesData, isLoading: matchesDataLoading, isFetching: matchesDataFetching, isError: matchesDataError } = useQuery({
        queryKey: ["macthes", apiParams],
        queryFn: () => matchesApiFn({team_id: teamData.id,...apiParams.current}),
        enabled : !!teamData.id
    })

    const { data: matchesDays, isLoading: matchesDaysLoading, isFetching: matchesDaysFetching, isError: matchesDaysError } = useQuery({
        queryKey: ["macthes-dates", apiParams],
        queryFn: () => macthesDaysApiFn({team_id: teamData.id,...apiParams.current}),
        enabled : !!teamData.id
    })

    useEffect(() => {
        if (!matchesDataLoading) {
            setMatches(matchesData)
        }
    }, [matchesDataLoading, matchesDataFetching]);

    useEffect(() => {
        onDropdownValueChange()
        onCalendarValueChange()
    }, [filters.tournament.id, selectedCalendarDate]);


    const onDropdownValueChange = () => {
        if (filters.tournament.id !== "showAll") {
            apiParams.current.tournament_id = filters.tournament.id
            const Filtered = filterMatchesData(matchesData, filters.tournament.id)
            setMatches(Filtered)
        }
        else {
            apiParams.current.tournament_id = null
            setMatches(matchesData)
        }
    }


    const onCalendarValueChange = () => {
        const year = selectedCalendarDate.getFullYear();
        const month = (selectedCalendarDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedCalendarDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        apiParams.current.year = year
        apiParams.current.month = month

        const Filtered = filterMatchesData(matchesData, filters.tournament.id, formattedDate)
        setMatches(Filtered)
    }

    return (
        <div className={styles['ahly-matches']}>
            <div className={styles['controls']}>
                <h3>{"جميع المباريات"}</h3>
                <div>
                    <CustomCalendar
                        matchesDaysArr={matchesDays}
                        selectedCalendarDate={selectedCalendarDate}
                        setSelectedCalendarDate={setSelectedCalendarDate}
                    />

                    <div className={styles["drop-down"]} >
                        {matchesDataLoading
                            ? <Barloader className="my-2" color="var(--light-green)" height={8} width={150} />
                            : <CustomDropdown
                                data={[{ id: "showAll", title: "كل البطولات" }, ...activeTournaments]}
                                dataID='id'
                                dataName='title'
                                name='tournament'
                                filters={filters}
                                setFilters={setFilters}
                            />}
                    </div>
                </div>
            </div>

            <div className={styles["match-card-wraper"]}>
                <MatchesList isLoading={matchesDataLoading} matchesArr={matches} />
            </div>

        </div>
    )
}

export default AhlyMatchesTab