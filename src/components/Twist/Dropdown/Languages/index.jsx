import { Children } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import langIcon from 'src/assets/images/Twist/lang-icon.svg';
import styles from './index.module.css';

function LanguagesDropdown() {
	const {
		i18n: { language, languages, changeLanguage },
	} = useTranslation();

	return (
		<Dropdown
			className={`${styles['languages-dropdown']} `}
			onSelect={(eventKey) => changeLanguage(eventKey)}
			as={ButtonGroup}
			size={'sm'}>
			<Dropdown.Toggle />
			<Button className={`d-flex align-items-center`}>
				<span>{language}</span>
				<img src={langIcon} width={30} height={30} alt='Language icon' />
			</Button>
			<Dropdown.Menu>
				{Children.toArray(
					languages.map(
						(lang) =>
							lang !== language && (
								<Dropdown.Item eventKey={lang}>
									<span>{lang}</span>
								</Dropdown.Item>
							),
					),
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default LanguagesDropdown;
