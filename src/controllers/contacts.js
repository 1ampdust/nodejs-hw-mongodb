import createHttpError from "http-errors";
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact
} from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res) => {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = { ...parseFilterParams(req.query), userId };
  
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
  
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  };
  
  export const getContactByIdController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const contact = await getContactById(contactId, userId);
  
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
  
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };

export const createContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const contactData = { ...req.body, userId };
    const contact = await createContact(contactData);
    
    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact,
    });
  };

  export const patchContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const result = await patchContact(contactId, req.body, userId);
  
    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
  
    res.json({
      status: 200,
      message: `Successfully updated contact with id ${contactId}!`,
      data: result,
    });
  };

  export const deleteContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
  
    const contact = await deleteContact(contactId, userId);
  
    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
  
    res.status(204).send();
  };
