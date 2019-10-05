const nodemailer = require('nodemailer')

exports.sendMail = async (req, res, next) => {
  const { email, subject, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })

  await transporter.sendMail({
    from: `DenunciApp <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    text: message,
    html: `<div><p>${message}</p></div>`
  })
  res.sendStatus(200).json({ message: `Email sent to ${email}` })
}