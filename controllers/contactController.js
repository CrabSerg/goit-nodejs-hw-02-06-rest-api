const { NotFound } = require("http-errors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

const contactByIdGet = async (req, res, next) => {
  try {
    const idContacts = await getContactById(req.params.contactId);
    if (!idContacts) {
      throw new NotFound({ message: "not found" });
    }
    res.status(200).json({ idContacts });
  } catch (error) {
    next(error);
  }
};

const contactRemove = async (req, res, next) => {
  try {
    const necessaryContact = await removeContact(req.params.contactId);
    if (!necessaryContact) {
      const error = new Error({ message: "not found" });
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const contactAdd = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);

    res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
};

const contactUpdate = async (req, res, next) => {
  try {
    const necessaryContact = await updateContact(
      req.params.contactId,
      req.body
    );

    if (!necessaryContact) {
      const error = new Error({ message: "not found" });
      error.status = 404;
      throw error;
    }

    res.status(200).json({ necessaryContact });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
};
