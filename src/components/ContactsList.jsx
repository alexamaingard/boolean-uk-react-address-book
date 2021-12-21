import { useNavigate } from "react-router-dom";

const ContactsList = props => {
  const { contacts, setContact } = props;

  const navigate = useNavigate();

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => navigate("/createContact", {replace: true})}
          className="button new-contact-btn"
        >
          Create
        </button>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;

          return (
            <li key={index} >
              <h3>
                {firstName} {lastName}
              </h3>
              <button
                className="button new-contact-btn"
                onClick={() => {
                  setContact(contact);
                  navigate(`/view/${contact.id}`, {replace: true});
                }}
              >View</button>
              <button
                className="button new-contact-btn"
                onClick={() => {
                  setContact(contact);
                  navigate(`/editContact/${contact.id}`, {replace: true});
                }}
              >Edit</button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
