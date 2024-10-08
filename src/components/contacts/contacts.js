import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar.js';
import axios from 'axios';
import { LiaEditSolid } from 'react-icons/lia';
import { RiDeleteBin6Line } from 'react-icons/ri';
import contactsImg from '../../images/new.png';
import './contacts.css';

const backendUrl = 'http://localhost:5555/contacts/';

function Contacts() {
  const [allContacts, setAllContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [editingContact, setEditingContact] = useState(null);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    getAllContacts();
  }, []);

  useEffect(() => {
    setContacts(allContacts.slice(startIndex, endIndex));
    
  }, [startIndex, endIndex]) 

  function clearAllContacts() {
    setContacts([]);
  }

  function getAllContacts() {
    clearAllContacts();

    axios.get(backendUrl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        const allContacts = response.data.data;
        setAllContacts(allContacts);
        const dataToDisplay = allContacts.slice(startIndex, endIndex);
        setContacts(dataToDisplay);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const deleteContact = (contactId) => {
    axios.delete(`${backendUrl}/${contactId}`)
      .then(() => getAllContacts())
      .catch(error => console.error(error));
  }

  const editContact = (contact) => {
    setEditingContact(contact);
  }

  function saveEditedContact(id) {
    const editedContactName = document.getElementsByClassName('editedContactName')[0].value;
    const editedContactPhone = document.getElementsByClassName('editedContactPhone')[0].value;

    const dataToBeSent = {
      contactName: editedContactName,
      contactPhoneNumber: editedContactPhone
    }

    if (typeof editedContactName === 'string' && typeof Number(editedContactPhone) === 'number') {
      axios.patch(`${backendUrl}${encodeURIComponent(id)}`, dataToBeSent)
        .then(() => {
          setEditingContact(null);
          getAllContacts();
        })
        .catch((error) => console.error(error))
    } else if (editedContactPhone.length > 10) {
      window.alert("Phone number should be 10 digits long");
      getAllContacts();
      return;
    } else {
      window.alert("Invalid data format!");
      getAllContacts();
    }
  }

  function displayNextContacts(e) {

    if (endIndex === allContacts.length - 1) { //if only one element is left
      setStartIndex(allContacts.length - 1);
      setEndIndex(allContacts.length);
      return;
    }
    if (endIndex + 7 > allContacts.length) {
      setStartIndex(allContacts.length - (allContacts.length - endIndex));
      setEndIndex(allContacts.length);
      return;
    }

    setStartIndex(startIndex + 7);
    setEndIndex(endIndex + 7);
  }

  function displayPreviousContacts(e) {

    debugger;

    if (endIndex === 7) {
      e.preventDefault();
      return;
    }

    if (endIndex - 7 < 7) {
      setStartIndex(0);
      setEndIndex(7);
      return;
    }

    setStartIndex(startIndex - 7)
    setEndIndex(startIndex);
  }


  function sortAscending() {
    const sortedAlph = allContacts.slice().sort((a, b) => a.contactName.localeCompare(b.contactName));
    setAllContacts(sortedAlph);
    setStartIndex(0);
    setEndIndex(7); 
    setContacts(sortedAlph.slice(endIndex - 7, endIndex));
    setSelectedOption('A-Z');
  }


  function sortDescending() {
    const sortedDesc = allContacts.slice().sort((a, b) => b.contactName.localeCompare(a.contactName));
    setAllContacts(sortedDesc);
    setStartIndex(0);
    setEndIndex(7); 
    setContacts(sortedDesc.slice(endIndex - 7, endIndex));
    setSelectedOption('Z-A');
  }

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };


  return (
    <>
      <Navbar />
        <main className='main-contacts'>

          <div className="contacts-container">
            <div className='header-container'>

              <div className='headers'>
                <h1 className="contacts-heading">Contacts List</h1>

                <div className='sorting-container'>
                  <div className='dropdown'>
                    <button className='dropbtn'>{selectedOption || 'Sort'} &#9660;</button>
                    <div className='dropdown-content'>
                      <span onClick={() => { handleDropdownChange('A-Z'); sortAscending(); }}>A-Z</span>
                      <span onClick={() => { handleDropdownChange('Z-A'); sortDescending(); }}>Z-A</span>
                    </div>
                  </div>
                </div>


                <div className='content'>
                  {selectedOption === 'A-Z'}
                  {selectedOption === 'Z-A'}
                </div>
              </  div>
            </div>

            <section className="allContactsSection">
              {contacts.map((contact) => (
                <div key={contact._id} className="contact-item">
                  {editingContact === contact ? (
                    <div>
                      <input
                        type="text"
                        className="editedContactName"
                        placeholder={contact.contactName}
                      />
                      <input
                        type="number"
                        className="editedContactPhone"
                        placeholder={contact.contactPhoneNumber}
                      />
                      <button onClick={() => saveEditedContact(contact._id, editingContact)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="contact-details">
                        <span className="contact-name">{contact.contactName}:</span>{" "}
                        <span className="contact-phone">{contact.contactPhoneNumber}</span>
                      </div>
                      <div className="contact-actions">
                        <LiaEditSolid className="icons" onClick={() => editContact(contact)} />
                        <RiDeleteBin6Line className="icons" onClick={() => deleteContact(contact._id)} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>

            <div className='pages-container'>
              <a href="#" className="previous round" onClick={displayPreviousContacts}>&#8249;</a>
              <a href="#" className="next round" onClick={displayNextContacts}>&#8250;</a>
            </  div>

          </  div>

            <img className='img-contacts' src={contactsImg} alt="Contacts" />
            
        </  main >

    </  >
  )

}

export default Contacts;
