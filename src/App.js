import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles/styles.css";
import { APIEndpoints } from "./config";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);

  // [TODO] Write a useEffect to fetch contacts here...
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
      />
      <main>{!hideForm && <CreateContactForm contacts={contacts} />}</main>
    </>
  );
}
