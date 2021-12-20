const ViewContact = props => {
    const { contact } = props;

    return (
        <div className="address-card">
            <h1>{contact.firstName} {contact.lastName}</h1>
        </div>
    )
}

export default ViewContact