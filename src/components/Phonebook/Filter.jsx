import PropTypes from 'prop-types';
import styles from './filter.module.css';

const ContactsFilter = ({ handleChange }) => {
  return (
    <div>
      <label className={styles.label}>Find contacts by name</label>
      <input className={styles.input} name="filter" onChange={handleChange} />
    </div>
  );
};

export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
