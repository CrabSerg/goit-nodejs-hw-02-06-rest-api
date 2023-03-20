const { NotFound } = require("http-errors");

const  Contact  = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const contactByIdGet = async (req, res, next) => {
  try {
    const IdContact = await Contact.findById(req.params.contactId);
    if (!IdContact) {
      throw new NotFound({ message: "not found" });
    }
    res.status(200).json(IdContact);
  } catch (error) {
    next(error);
  }
};