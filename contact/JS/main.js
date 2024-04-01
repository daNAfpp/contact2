function initStorage() {
  if (!localStorage.getItem("contact")) {
    localStorage.setItem("contact", "[]");
  }
}
initStorage();

function getProductsFormLS() {
  const contacts = JSON.parse(localStorage.getItem("contact"));
  return contacts;
}

function setProductsTols(contacts) {
  localStorage.setItem("contact", JSON.stringify(contacts));
  return contacts;
}

let contacts = getProductsFormLS();
console.log(contacts);

const container = document.getElementById("container_contact");
const imgInp = document.getElementById("photo-upload");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const saveBtn = document.querySelector(".save-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchInp = document.querySelector("input.search-inp");
const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");
const saveGhanBtn = document.querySelector("#saveGhanBtn");

//!read

function render(data = getProductsFormLS()) {
  container.innerHTML = "";
  console.log(container);
  data.forEach((item, index) => {
    console.log(item);
    container.innerHTML += `
    <input class="first_inp" type="text" value="${item.firstName}">
       <button class="delete-btn">Удалить</button>

       <a id=${index} data-bs-toggle="modal"
                data-bs-target="#exampleModal" href="#" class="edit-btn">Редактировать</a> `;
  });
}

//!create

function createProduct() {
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !phoneNumber.value.trim()
  ) {
    alert("Some inputs are enpty");
    return;
  }

  let newContact = {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
  };

  console.log(firstName, lastName, phoneNumber);

  let contacts = getProductsFormLS();
  contacts.push(newContact);
  setProductsTols(contacts);

  firstName.value = "";
  lastName.value = "";
  phoneNumber.value = "";
  clearBtn.click();
  render();
}

saveBtn.addEventListener("click", createProduct);

//!update

function getOneProductByIndex(index) {
  const contactObj = getProductsFormLS()[index];
  return contactObj;
}
let id = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    let foundObj = getOneProductByIndex(e.target.id);
    console.log("obj", foundObj);
    firstName.value = foundObj.firstName;
    lastName.value = foundObj.lastName;
    phoneNumber.value = foundObj.phoneNumber;

    id = e.target.id;
    // render();
  }
});

saveGhanBtn.addEventListener("click", () => {
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !phoneNumber.value.trim()
  ) {
    alert("Some inputs are enpty");
    return;
  }
  const editeObj = {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
  };

  const lastContact = getProductsFormLS();
  lastContact.splice(id, 1, editeObj);
  setProductsTols(lastContact);

  firstName.value = "";
  lastName.value = "";
  phoneNumber.value = "";
  clearBtn.click();
  render();
});

clearBtn.addEventListener("click", function () {
  firstName.value = "";
  lastName.value = "";
  phoneNumber.value = "";

  contacts = [];
  render();
});
//! delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let ans = confirm("Are you sure?");
    if (!ans) return;
    const contacts = getProductsFormLS();
    contacts.splice(e.target.id, 1);
    console.log(contacts);
    setProductsTols(contacts);

    render();
  }
});

//!search

searchInp.addEventListener("input", (e) => {
  console.log(e.target.value);
  const contacts = getProductsFormLS();
  const filter = contacts.filter(
    (item) =>
      item.lastName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
  );
  console.log(filter);
  render(filter);
});

// saveBtn.addEventListener("click", createProduct);
// render();

// let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// function setProductsTols(contacts) {
//   localStorage.setItem("contacts", JSON.stringify(contacts));
// }

// saveBtn.addEventListener("click", function () {
//   if (
//     !firstName.value.trim() ||
//     !lastName.value.trim() ||
//     !phoneNumber.value.trim()
//   ) {
//     alert("Some inputs are enpty");
//     return;
//   }

//   let contact = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     phoneNumber: phoneNumber.value,
//   };

//   contacts.push(contact);
//   console.log(contacts);

//   // Сохраняем массив контактов в localStorage
//   localStorage.setItem("contacts", JSON.stringify(contacts));

//   newContact();
// });

// clearBtn.addEventListener("click", function () {
//   firstName.value = "";
//   lastName.value = "";
//   phoneNumber.value = "";

//   contacts = [];
//   newContact();
// });

// function newContact() {
//   container.innerHTML = "";
//   console.log(container);
//   contacts.forEach((item, index) => {
//     // console.log(item);
//     container.innerHTML += `
//     <input class="first_inp" type="text" value="${item.firstName}">
//        <button class="delete-btn">Удалить</button>

//        <a id=${index} data-bs-toggle="modal"
//                 data-bs-target="#exampleModal" href="#" class=" edit-btn">Редактировать</a> `;
//   });
// }
// newContact();

// //!delete
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete-btn")) {
//     let ans = confirm("Are you sure?");
//     if (!ans) return;
//     let index = Array.from(container.children).indexOf(e.target.parentNode);
//     console.log(contacts, index);
//     contacts.splice(e.target.id, 1);
//     setProductsTols(contacts);
//     console.log(contacts);
//     newContact();
//   }
// });

// function getOneProductByIndex(index) {
//   return contacts[index];
// }

// //!updata
// let id = null;

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("edit-btn")) {
//     id = Number(e.target.id);
//     let foundObj = getOneProductByIndex(id);
//     console.log("obj", foundObj);
//     firstName.value = foundObj.firstName;
//     lastName.value = foundObj.lastName;
//     phoneNumber.value = foundObj.phoneNumber;

//     id = e.target.id;
//   }
//   newContact();
// });

// saveBtn.addEventListener("click", () => {
//   if (
//     !firstName.value.trim() ||
//     !lastName.value.trim() ||
//     !phoneNumber.value.trim()
//   ) {
//     alert("Some inputs are empty");
//     return;
//   }

//   const editeObj = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     phoneNumber: phoneNumber.value,
//   };

//   contacts.splice(id, 1, editeObj);
//   setProductsTols(contacts);

//   firstName.value = "";
//   lastName.value = "";
//   phoneNumber.value = "";
//   clearBtn.click();
//   newContact();
// });

// //!search
// searchInp.addEventListener("input", (e) => {
//   console.log(e.target.value);
//   const filter = contacts.filter((item) =>
//     item.lastName.toLowerCase().includes(e.target.value.toLowerCase())
//   );
//   console.log(filter);
//   newContact(filter);
// });
