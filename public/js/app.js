// console.log("Client side JavaScript file is loaded!");

const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (event) => {
  msg1.textContent = "Loading...";
  msg2.textContent = "";
  event.preventDefault();
  fetch("http://localhost:3000/weather?address=" + address.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
      address.value = "";
    });
  });
});
