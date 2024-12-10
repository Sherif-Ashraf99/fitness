import { useInfiniteQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import LoadMore from '../../shared/LoadMore';
import Media from '../../Media';
import apis from 'src/services/Twist';
import MainMedia from '../../shared/MainMedia';
import SectionTitle from '../../shared/SectionTitle';
import styles from './index.module.css';
import SkeletonsElements from 'src/components/Shared/SkeletonsElements';
import MediaSearchBar from '../../MediaSearchBar';
import { useState } from 'react';
import useWindowSize from 'src/hooks/useWindowSize';
import ArrowPage from '../../ArrowPage';

const apiFn = (params) => apis.media.getMediaList(params);

function MostPopular({
	season_id,
	items_count = 4,
	type = null,
	tournament_id = null,
	media_id = null,
	team_id = null,
	player_id = null,
	top_stories = null,
	latest = null,
	popular = null,
	isPlayBtn = false,
	title = '',
	sport_id = null,
	service_id = null,
	showSearchInput = true,
	showLoadMore = true,
	section_id = null,

}) {
	const { width } = useWindowSize();
	const [searchValue, setSearchValue] = useState('');

	const apiParams = (pageParam) => {
		if (searchValue) {
			return {
				season_id,
				items_count,
				type,
				sport_id,
				service_id,
				tournament_id,
				media_id,
				team_id,
				player_id,
				top_stories,
				latest,
				popular,
				page: pageParam,
				keyword: searchValue,
			};
		} else {
			return {
				season_id,
				items_count,
				type,
				sport_id,
				service_id,
				tournament_id,
				media_id,
				team_id,
				player_id,
				top_stories,
				latest,
				popular,
				page: pageParam,
				section_id,
			};
		}
	};
	const {
		data = {},
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: [
			'media',
			season_id,
			items_count,
			type,
			tournament_id,
			media_id,
			team_id,
			player_id,
			top_stories,
			latest,
			popular,
			sport_id,
			service_id,
			searchValue,
		],
		queryFn: ({ pageParam = 1 }) => apiFn(apiParams(pageParam)),
		getNextPageParam: (_lastPage, pages) => {
			if (pages.at(-1).current_page === pages.at(-1).last_page)
				return undefined;
			return pages.at(-1).current_page + 1;
		},
	});

	const dataArrLength = data?.pages?.[0]?.data.length;

	const getMainMediaData = () => data?.pages?.[0]?.data.slice(0, 4);

	const getMediaData = () => {
		const initialValue = data?.pages?.[0]?.data.slice(4);
		const currentPage = data?.pages?.length;
		return data?.pages
			?.slice(1)
			.reduce((prev, curr) => [...prev, ...curr.data], initialValue)
			.slice(0, currentPage * 4);
	};

	return (
		<section className={`${styles['most-popular']} most-popular-global`}>
			<div className={styles['header-section']}>
				<div className={styles['title-search']}>
					<SectionTitle title={title} />
					{showSearchInput && (
						<MediaSearchBar setSearchValue={setSearchValue} />
					)}
				</div>

				{title === 'اخر الأخبار' && (
					<ArrowPage title={'كل الأخبار'} endPoint={'/news'} />
				)}
			</div>
			{isLoading && (
				<div className={styles['main-media-carousel-loader']}>
					{[...Array(4).keys()].map((key) => (
						<SkeletonsElements
							key={key}
							type='twistMediaCard'
							imageHeight={!key && width >= 992 ? '4rem' : '2rem'}
							textHeight={!key && width >= 992 ? '1.5rem' : '1rem'}
						/>
					))}
				</div>
			)}
			{isLoading && (
				<div className={styles['sub-media-carousel-loader']}>
					{[...Array(4).keys()].map((key) => (
						<SkeletonsElements
							key={key}
							type='twistMediaCard'
							imageHeight='2rem'
							textHeight='1rem'
						/>
					))}
				</div>
			)}
			{!isLoading && (
				<MainMedia data={getMainMediaData()} isPlayBtn={isPlayBtn} />
			)}
			{!isLoading && (items_count > 4) && <Media data={getMediaData()} isPlayBtn={isPlayBtn} />}
			{!isLoading && dataArrLength > 0 && showLoadMore && (
				<LoadMore
					isLoading={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
				/>
			)}
		</section>
	);
}

MostPopular.propTypes = {
	season_id: PropTypes.number,
	items_count: PropTypes.number,
	type: PropTypes.number,
	tournament_id: PropTypes.number,
	media_id: PropTypes.number,
	team_id: PropTypes.number,
	player_id: PropTypes.number,
	top_stories: PropTypes.bool,
	latest: PropTypes.bool,
	popular: PropTypes.bool,
	isPlayBtn: PropTypes.bool,
	title: PropTypes.string,
	sport_id: PropTypes.number,
	service_id: PropTypes.number,
};

export default MostPopular;
