import PropTypes from 'prop-types';
import styles from './contacts-list.module.css';

const ContactsList = ({ deleteName, contacts }) => {
  const contact = contacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}.
      <button
        className={styles.btn}
        onClick={() => deleteName(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={styles.list}>{contact}</ul>;
};

export default ContactsList;

ContactsList.defaultProps = {
  contacts: [],
};

ContactsList.propTypes = {
  deleteName: PropTypes.func.isRequired,
  contactss: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
};
