import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APIEndpoints } from "../config"

const CreateContactForm = props => {
  const { contacts, setContact, setContacts } = props;

  const navigate = useNavigate();
  
  const [newContact, setNewContact] = useState({
      firstName: "",
      lastName: "",
      blockContact: false,
      addressId: null
  });

  const [newContactAddress, setNewContactAddress] = useState({
      street: "",
      city: "",
      postCode: ""
  });
  const [submit, setSubmit] = useState(false);

  useEffect(async () => {
    if(submit)  {
      const found = contacts.find(contact => contact.address.street === newContactAddress.street);
      let addressId;
      let id;
      let contact;
      if (found) {
        addressId = found.addressId;
      } 
      else {
        await fetch(APIEndpoints.addresses, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContactAddress)
        })
        .then(res => res.json())
        .then(value => addressId = value.id)
      }
      const res = await fetch(APIEndpoints.contacts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...newContact, addressId: addressId})
      })
      const data = await res.json();
      id = data.id;
      contact = data;
      const resp = await fetch(APIEndpoints.contacts);
      const newData = await resp.json();
      setContacts(newData);
      setSubmit(false);
      setContact({...newContact, address: {...newContactAddress}});
      navigate(`/view/${contact.id}`, {replace: true});
    }
  }, [submit])

  const handleChange = (event) => {
    let {value, name, type, checked} = event.target;
    type === "checkbox" && (value = checked); // handles checkbox and sets value to true or false
    if(name in newContact){
      setNewContact({
        ...newContact, [name]: value
      });
    }
    else {
      setNewContactAddress({
        ...newContactAddress, [name]: value
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewContact(newContact);
    setNewContactAddress(newContactAddress);
    setSubmit(true);
  }

  return (
    <form className="form-stack light-shadow center contact-form" onSubmit={handleSubmit}>
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input 
        id="first-name-input" 
        name="firstName" 
        type="text" 
        value={newContact.firstName}
        onChange={handleChange}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input 
        id="last-name-input" 
        name="lastName" 
        type="text" 
        value={newContact.lastName}
        onChange={handleChange}
      />
      <label htmlFor="street-input">Street:</label>
      <input 
        id="street-input" 
        name="street" 
        type="text" 
        value={newContactAddress.street}
        onChange={handleChange}
      />
      <label htmlFor="city-input">City:</label>
      <input 
        id="city-input" 
        name="city" 
        type="text" 
        value={newContactAddress.city}
        onChange={handleChange}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input 
        id="post-code-input" 
        name="postCode" 
        type="text" 
        value={newContactAddress.postCode}
        onChange={handleChange}
      />
      <div className="checkbox-section">
        <input 
          id="block-checkbox" 
          name="blockContact" 
          type="checkbox" 
          checked={newContact.blockContact}
          onChange={handleChange}
        />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button 
          className="button blue" 
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
