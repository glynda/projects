function userSubmit() {
  const userName = document.querySelector("#userName");
  const resultUsername = document.querySelector("#resultUsername");
  !userName.value
    ? (resultUsername.textContent = "Please enter name")
    : (resultUsername.textContent = `Hi there, ${userName.value}!`);
}
const submit = document.querySelector("#submit");
submit.addEventListener("click", userSubmit);
