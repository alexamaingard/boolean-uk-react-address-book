const ViewContact = props => {
    const { contact } = props;

    return (
        <div className="view-contact">
            <div className="light-shadow center">
                <h2>{contact.firstName} {contact.lastName}</h2>
                <p>{contact.address.street}</p>
                <p>{contact.address.city}</p>
                <p>{contact.address.postCode}</p>
            </div>
        </div>
    )
}

export default ViewContact