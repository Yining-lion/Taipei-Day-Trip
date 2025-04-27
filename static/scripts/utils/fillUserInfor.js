export function fillUserInfo(inputName, inputEmail, user) {
    inputName.value = user.name || "";
    inputEmail.value = user.email || "";
  }