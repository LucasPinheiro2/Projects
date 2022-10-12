import emailjs from "emailjs-com";

export default function ContactUs(username, first, last, name, day, time) {
  var templateParams = {
    username: username["username"],
    first: first,
    last: last,
    dateName: name,
    dateDay: day,
    dateTime: time
  };

  emailjs
    .send(
      "personal4",
      "template_24iv7ys",
      templateParams,
      "user_h2CPk50l7whzWFdhMRUBX"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}
