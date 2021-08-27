const mailjet = require ('node-mailjet').connect('5a8a9ba004aeb8393227cac4ad8e8c75', '232c3e500109e16866331c7cf30a9f91');

module.exports = async (to, content) => {
  const subject = content.Subject;
  const text = content.TextPart;
  const html = content.HTMLPart;
  const task =content.TextPart;
  await mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "clientes@chigui.com.pe",
          "Name": "Chigui"
        },
        "To": [
          {
            "Email": to,
            "Name": "Chigui"
          }
        ],
        "Subject": subject,
        "TextPart": text,
        "HTMLPart": html,
        "CustomID": task
      }
    ]
  })
}