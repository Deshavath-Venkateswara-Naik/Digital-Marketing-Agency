const ContactMessage = require("../../models/ContactMessage");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message submitted successfully." });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
