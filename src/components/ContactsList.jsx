function ContactsList(props) {
  const { contacts, hideForm, setHideForm } = props;

  const handleViewClick = event => {
    //console.log(event.target);
  }

  const handleEditClick = event => {
    //console.log(event.target);
  }

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;

          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <button
                className="button new-contact-btn"
                onClick={handleViewClick}
              >View</button>
              <button
                className="button new-contact-btn"
                onClick={handleEditClick}
              >Edit</button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
