const express = require("express");

const {
  validation,
  tokenVerification,
  controllerWrapper,
  upload,
} = require("../../middlewares");
const { register, login, logout } = require("../../controllers/auth");
const { 
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/user");

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
} = require("../../Schemas/Schemas");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), controllerWrapper(register));
router.post("/login", validation(joiLoginSchema), controllerWrapper(login));
router.post("/logout", tokenVerification, controllerWrapper(logout));
router.patch(
  "/",
  tokenVerification,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
);

router.get("/current", tokenVerification, controllerWrapper(getCurrent));
router.patch(
  "/avatars",
  tokenVerification,
  upload.single("avatar"),
  controllerWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", controllerWrapper(verifyEmail));
router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  controllerWrapper(resendVerifyEmail)
);

module.exports = router;
