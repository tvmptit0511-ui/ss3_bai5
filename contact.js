
let form = document.getElementById("contact-form");
let nameInput = document.getElementById("contact-name");
let phoneInput = document.getElementById("contact-phone");
let emailInput = document.getElementById("contact-email");
let tbody = document.getElementById("contact-tbody");


let contacts = [];

let editIndex = -1;

let nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;
let phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function saveToLocalStorage() {

  let data = JSON.stringify(contacts);

  localStorage.setItem("contacts", data);

}

function loadFromLocalStorage() {

  let data = localStorage.getItem("contacts");

  if (data) {
    contacts = JSON.parse(data);
  }

}

function validateInput(name, phone, email) {

  if (name === "") {
    alert("Họ tên không được để trống!");
    return false;
  }

  if (name.length < 2) {
    alert("Họ tên phải có ít nhất 2 ký tự!");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Họ tên không được chứa số hoặc ký tự đặc biệt!");
    return false;
  }


  if (phone === "") {
    alert("Số điện thoại không được để trống!");
    return false;
  }

  if (!phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng");
    return false;
  }


  if (email === "") {
    alert("Email không được để trống!");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ!");
    return false;
  }

  for (let i = 0; i < contacts.length; i++) {

    if (contacts[i].email === email && i !== editIndex) {

      alert("Email đã tồn tại trong danh bạ!");
      return false;

    }

  }

  return true;

}

function renderContacts() {

  tbody.innerHTML = "";

  if (contacts.length === 0) {
    tbody.innerHTML =
      `<tr>
        <td colspan="5" style="text-align:center;">
          Không có liên hệ
        </td>
      </tr>`;
    return;
  }

  for (let i = 0; i < contacts.length; i++) {

    let contact = contacts[i];

    let row =
      `<tr>
        <td>${i + 1}</td>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-edit" onclick="editContact(${i})">Sửa</button>
            <button class="btn-delete" onclick="deleteContact(${i})">Xóa</button>
          </div>
        </td>
      </tr>`;

    tbody.innerHTML += row;
  }

}

function resetForm() {

  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";

  editIndex = -1;

}

form.addEventListener("submit", function(event) {

  event.preventDefault();

  let name = nameInput.value.trim();
  let phone = phoneInput.value.trim();
  let email = emailInput.value.trim();


  let isValid = validateInput(name, phone, email);

  if (!isValid) return;

  if (editIndex !== -1) {

    contacts[editIndex].name = name;
    contacts[editIndex].phone = phone;
    contacts[editIndex].email = email;

    alert("Cập nhật liên hệ thành công!");

  }

  else {

    let newContact = {

      name: name,
      phone: phone,
      email: email

    };

    contacts.push(newContact);

    alert("Thêm liên hệ thành công!");

  }

  
  saveToLocalStorage();

  
  renderContacts();

  
  resetForm();

});


function deleteContact(index) {

  let confirmDelete = confirm("Bạn có chắc muốn xóa?");

  if (!confirmDelete) return;


  contacts.splice(index, 1);


  saveToLocalStorage();

  renderContacts();

}

function editContact(index) {

  let contact = contacts[index];

  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;

  editIndex = index;

}

function init() {

  loadFromLocalStorage();

  renderContacts();

}

init();
console.log(contacts);