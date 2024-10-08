import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './home.css';
import axios from 'axios';
import phoneIcon from '../../images/icons-1831922_1920.png';
import { HiArrowDown } from 'react-icons/hi';

const backendUrl = 'http://localhost:5555/contacts/';

function Home() {
  const [contactName, setContact] = useState('');
  const [contactPhoneNumber, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  const handleContactChange = event => {
    setContact(event.target.value);
  };

  const handlePhoneChange = event => {
    setNumber(event.target.value);
  };

  function clearAllContacts() {
    setContacts([]);
  }

  function getAllContacts() {
    clearAllContacts();
    setContact('');
    setNumber('');

    axios.get(backendUrl)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setContacts(response.data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const postNewContact = () => {
    const data = {
      contactName,
      contactPhoneNumber
    };

    if (contactPhoneNumber.length === 10 && !isNaN(contactPhoneNumber)) {
      axios.post(backendUrl, data)
      .then(() => getAllContacts())
      .catch(error => console.error(error));
    }
    else if (!Number(contactPhoneNumber)) {
      window.alert("Invalid data format!");
      setContact('');
      setNumber('');
    } else {
      window.alert("Phone number should be 10 digits long");
      setContact('');
      setNumber('');
      return;
    }
    
  }


  return (
    <>

      <main className='main-home'>
        <img className='img-phone' src={phoneIcon} />
        <div className="contacts">
          <h1 className="dialer-heading">Contacts Hub</h1>
          <h1 className="dialer-heading">Add a new contact.</h1>

          < HiArrowDown className='down-arrow' />

          <div className='inputs-container'>
            <input
              type="text"
              className="name"
              placeholder="contactName"
              onChange={handleContactChange}
              value={contactName}
            />
            <input
              type="text"
              className="phoneNumber"
              placeholder="phoneNumber"
              onChange={handlePhoneChange}
              value={contactPhoneNumber}
            />
          </div>

          <button className="btn btn-primary" onClick={postNewContact}>
            Submit
          </button>
          <NavLink
            to="contacts">
            <button className='btn btn-primary'>
              View all
            </button>
          </NavLink>

        </div>
      </main>

    </>
  );
}

export default Home;
