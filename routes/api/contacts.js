const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
} = require("../../controllers/contactController");

const { validation } = require("../../middlewares");
const { schemaAdd, schemaUpdate } = require("../../schemas/schemas");

router.get("/", getContact);

router.get("/:contactId", contactByIdGet);

router.post("/", validation(schemaAdd), contactAdd);

router.delete("/:contactId", contactRemove);

router.put("/:contactId", validation(schemaUpdate), contactUpdate);

module.exports = router;
