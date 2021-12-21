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

  useEffect(async () => {
    const res = await fetch(APIEndpoints.contacts);
    const data = await res.json();
    setContacts(data);
  }, []);

  return (
    <>
      <ContactsList contacts={contacts} setContact={setContact}/>
      <main>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/createContact" element={<CreateContactForm contacts={contacts} setContact={setContact} setContacts={setContacts}/>} />
        <Route path="/editContact/:id" element={<EditContactForm contact={contact} setContacts={setContacts} contacts={contacts} setContact={setContact} />} />
        <Route path="/view/:id" element={<ViewContact contact={contact}/>} />
      </Routes>
      </main>
    </>
  );
}

export default App