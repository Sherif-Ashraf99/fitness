import Table from 'react-bootstrap/Table';
import styles from './index.module.css';
import apis from 'src/services/Olympics';
import { useQuery } from '@tanstack/react-query';
import { Children, useState } from 'react';
import { ImgURL } from 'src/utils/globalFn';
import sortDesArrowIcon from './aseArrow.svg';
import sortAscArrowIcon from './desArrow.svg';

const apiFn = () => apis.medals.getOlymbicMedals();

export default function MedalsTable({ maxRow = 0 }) {
	const [medalsSortOption, setMedalSortOption] = useState({
		medalsType: '',
		sortBy: '',
	});
	const { data, isLoading, isError } = useQuery({
		queryKey: ['olympics-medals-prizes'],
		queryFn: () => apiFn(),
	});

	if (isLoading || isError) return;

	const getSortedData = () => {
		if (!maxRow) return data;
		return data.slice(0, maxRow);
	};

	const isActiveArrow = (medalsType, sortBy) => {
		const sortOptionValues = Object.values(medalsSortOption);
		if (
			sortOptionValues.includes(medalsType) &&
			sortOptionValues.includes(sortBy)
		)
			return true;
		return false;
	};

	const handleSortMedals = (medalsType, sortBy) => {
		setMedalSortOption((prev) => ({ ...prev, medalsType, sortBy }));
		return data.sort((a, b) => {
			if (sortBy === 'ase') return a[medalsType] - b[medalsType];
			return b[medalsType] - a[medalsType];
		});
	};

	return (
		<section className={styles['medals-table-section']}>
			<Table className={styles['medals-table']} responsive borderless hover>
				<thead>
					<tr>
						<th>
							<span>الفريق</span>
						</th>
						<th>
							<span>الذهبية</span>
							<div>
								<img
									src={sortDesArrowIcon}
									className={
										styles[`${isActiveArrow('gold', 'ase') ? 'active' : ''}`]
									}
									alt='ase-arrow-icon'
									onClick={() => handleSortMedals('gold', 'ase')}
								/>
								<img
									src={sortAscArrowIcon}
									className={
										styles[`${isActiveArrow('gold', 'des') ? 'active' : ''}`]
									}
									alt='des-arrow-icon'
									onClick={() => handleSortMedals('gold', 'des')}
								/>
							</div>
						</th>
						<th>
							<span>الفضية</span>
							<div>
								<img
									src={sortDesArrowIcon}
									className={
										styles[`${isActiveArrow('silver', 'ase') ? 'active' : ''}`]
									}
									alt='ase-arrow-icon'
									onClick={() => handleSortMedals('silver', 'ase')}
								/>
								<img
									src={sortAscArrowIcon}
									className={
										styles[`${isActiveArrow('silver', 'des') ? 'active' : ''}`]
									}
									alt='des-arrow-icon'
									onClick={() => handleSortMedals('silver', 'des')}
								/>
							</div>
						</th>
						<th>
							<span>البرونزية</span>
							<div>
								<img
									src={sortDesArrowIcon}
									className={
										styles[`${isActiveArrow('metal', 'ase') ? 'active' : ''}`]
									}
									alt='ase-arrow-icon'
									onClick={() => handleSortMedals('metal', 'ase')}
								/>
								<img
									src={sortAscArrowIcon}
									className={
										styles[`${isActiveArrow('metal', 'des') ? 'active' : ''}`]
									}
									alt='des-arrow-icon'
									onClick={() => handleSortMedals('metal', 'des')}
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{Children.toArray(
						getSortedData().map(
							({ location, location_logo, gold, silver, metal }) => (
								<tr>
									<td>
										<figure className={styles['country-logo']}>
											<img src={ImgURL(location_logo)} alt='country-logo' />
											<span> {location}</span>
										</figure>
									</td>
									<td>{gold}</td>
									<td>{silver}</td>
									<td>{metal}</td>
								</tr>
							),
						),
					)}
				</tbody>
			</Table>
		</section>
	);
}
