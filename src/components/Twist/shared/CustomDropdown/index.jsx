import styles from './index.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaChevronDown } from 'react-icons/fa'
import PropTypes from 'prop-types';


function CustomDropdown({ data, name, filters, setFilters, width, maxWidth, dataID, dataName, propertyTargetPath = undefined }) {

    const handleChange = (id, event, name) => {
        const targetNameValue = event.target.innerHTML;
        const getFilterPropertyKeyAndValue = () => {
            if (!propertyTargetPath) return [name, { id: id, name: targetNameValue }];
            const objValue = {};
            const path = propertyTargetPath.split('.').slice(0, -1).reverse();
            for (const index in path) {
                if (index === '0') objValue[path[index]] = { id: id, name: targetNameValue };
                else objValue[path[index]] = { ...objValue }
            }
            const parentKey = path.at(-1);
            const { [parentKey]: identifierValue } = objValue;
            return [parentKey, identifierValue];
        }
        const values = getFilterPropertyKeyAndValue();

        setFilters(prev => ({
            ...prev,
            [values[0]]: values[1]
        }))
    }

    const getFilterPropertyName = (filterObj) => {
        if (!propertyTargetPath) return filterObj[name].name;
        let value = filterObj;
        const path = propertyTargetPath.split('.');
        for (const key of path) value = value[key];
        return value;
    }


    return (
        <Dropdown
            className={`${styles['filters-dropdown']}`}
            style={{ width, maxWidth }}
            onSelect={(eventKey, event) => handleChange(eventKey, event, name)}
        >
            <Dropdown.Toggle style={{ width, maxWidth }} >
                <span>{getFilterPropertyName(filters)}</span>
                {/* <span>{filters[name].name}</span> */}
                <FaChevronDown />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {data.map(item => (
                    <Dropdown.Item key={item[dataID]} eventKey={item[dataID]}>{item[dataName]}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

CustomDropdown.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    dataID: PropTypes.string,
    dataName: PropTypes.string,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
    width: PropTypes.string,
    maxWidth: PropTypes.string,
    propertyTargetPath: PropTypes.string,
}

export default CustomDropdown