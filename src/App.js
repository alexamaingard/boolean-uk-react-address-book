import { useState, useEffect } from "react";
import { Route, Routes } from "react-router"
import { Link } from "react-router-dom"
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import ViewContact from "./components/ViewContact";

import "./styles/styles.css";
import { APIEndpoints } from "./config";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [hideForm, setHideForm] = useState(true);
  const [hideEditForm, setHideEditForm] = useState(true);
  const [hideContact, setHideContact] = useState(true);

  useEffect(() => {
    fetch(APIEndpoints.contacts)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      setContacts(data);
    })
  }, [])

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        hideEditForm={hideEditForm}
        setHideEditForm={setHideEditForm}
        setContact={setContact}
        hideContact={hideContact}
        setHideContact={setHideContact}
      />
      <main>{!hideForm && hideEditForm && hideContact && <CreateContactForm contacts={contacts} />}
      {!hideEditForm && <EditContactForm contact={contact} setContacts={setContacts} contacts={contacts}/>}
      {!hideContact && <ViewContact contact={contact} />}
      </main>
      
      <Routes>
        <Route path="/view/:id" element={<ViewContact contact={contact}/>} />
      </Routes>
    </>
  );
}

export default App