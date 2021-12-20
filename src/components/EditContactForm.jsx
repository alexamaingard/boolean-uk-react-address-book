import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { APIEndpoints } from "../config"

const EditContactForm = props => {
    const { contact, setContacts, contacts } = props;

    const [updateContact, setUpdateContact] = useState({
            firstName: contact.firstName,
            lastName: contact.lastName,
            blockContact: contact.blockContact
        });
    const [updateAddress, setUpdateAddress] = useState({
            street: contact.street,
            city: contact.city,
            postCode: contact.postCode
        });
    const [submit, setSubmit] = useState(false);
    const [deleteContact, setDeleteContact] = useState(false);

    const navigate = useNavigate();

    useEffect(async () => {
        if(submit){
            await fetch(`${APIEndpoints.addresses}${contact.addressId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateAddress)
            });
            await fetch(`${APIEndpoints.contacts}${contact.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateContact)
            })
            await fetch(APIEndpoints.contacts)
            .then(res => res.json())
            .then(data => setContacts(data))
            setSubmit(false);
            navigate(`/view/${contact.id}`, {replace: true});
        }
    }, [submit])

    useEffect(async() => {
        if(deleteContact){
            await fetch(`${APIEndpoints.contacts}${contact.id}`, {
                method: "DELETE"
            });
            setDeleteContact(false);
        }
    }, [deleteContact])

    const handleChange = event => {
        let {value, name, type, checked} = event.target;
        type === "checkbox" && (value = checked); // handles checkbox and sets value to true or false
        if(name in updateContact){
            setUpdateContact({
            ...updateContact, [name]: value
            });
        }
        else {
            setUpdateAddress({
            ...updateAddress, [name]: value
            });
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        setUpdateContact(updateContact);
        setUpdateAddress(updateAddress);
        setSubmit(true);
    }

    const handleDelete = event => {
        setDeleteContact(true);
    }

    return (
        <form className="form-stack light-shadow center contact-form" onSubmit={handleSubmit}>
            <h1>Edit Contact</h1>
            <label htmlFor="first-name-input">First Name:</label>
            <input 
                id="first-name-input" 
                name="firstName" 
                type="text" 
                placeholder={contact.firstName}
                onChange={handleChange}
            />
            <label htmlFor="last-name-input">Last Name:</label>
            <input 
                id="last-name-input" 
                name="lastName" 
                type="text" 
                value={contact.lastName}
                onChange={handleChange}
            />
            <label htmlFor="street-input">Street:</label>
            <input 
                id="street-input" 
                name="street" 
                type="text" 
                value={contact.address.street}
                onChange={handleChange}
            />
            <label htmlFor="city-input">City:</label>
            <input 
                id="city-input" 
                name="city" 
                type="text" 
                value={contact.address.city}
                onChange={handleChange}
            />
            <label htmlFor="post-code-input">Post Code:</label>
            <input 
                id="post-code-input" 
                name="postCode" 
                type="text" 
                value={contact.address.postCode}
                onChange={handleChange}
            />
            <div className="checkbox-section">
                <input 
                    id="block-checkbox" 
                    name="blockContact" 
                    type="checkbox" 
                    checked={contact.blockContact}
                    onChange={handleChange}
                />
                <label htmlFor="block-checkbox">Block</label>
            </div>
            <div className="actions-section">
                <button className="button blue" type="submit">Update</button>
                <button 
                    className="button blue" 
                    type="submit"
                    onClick={handleDelete}
                >Delete</button>
            </div>
        </form>
    )
}

export default EditContactForm