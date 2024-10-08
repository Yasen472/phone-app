import express from 'express';
import { Contact } from '../models/contactModel.js';

const router = express.Router();

// Route for Save a new Contact
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.contactName ||
      !request.body.contactPhoneNumber
    ) {
      return response.status(400).send({
        message: 'Send all required fields: contact name, phone number',
      });
    }
    const newContact = {
      contactName: request.body.contactName,
      contactPhoneNumber: request.body.contactPhoneNumber,
    };

    const contact = await Contact.create(newContact);

    return response.status(201).send(contact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Router to get all contacts from the database
router.get('/', async (request, response) => {
  try {
    const contacts = await Contact.find({});

    return response.status(200).json({
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Contact from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const contact = await Contact.findById(id);

    return response.status(200).json(contact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Contact
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.contactName ||
      !request.body.contactPhoneNumber
    ) {
      return response.status(400).send({
        message: 'Send all required fields: contact name, phone number',
      });
    }

    const { id } = request.params;

    const result = await Contact.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Contact not found' });
    }

    return response.status(200).send({ message: 'Contact updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a contact
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Contact not found' });
    }

    return response.status(200).send({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Contact (PATCH)
router.patch('/:id', async (request, response) => {
  try {
    if (!request.body.contactName && !request.body.contactPhoneNumber) {
      return response.status(400).send({
        message: 'Send at least one field to update: contact name or phone number',
      });
    }

    const { id } = request.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'Contact not found' });
    }

    // Update the contact fields that are provided in the request body
    if (request.body.contactName) {
      contact.contactName = request.body.contactName;
    }
    if (request.body.contactPhoneNumber) {
      contact.contactPhoneNumber = request.body.contactPhoneNumber;
    }

    // Save the updated contact
    const updatedContact = await contact.save();

    return response.status(200).json(updatedContact);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
