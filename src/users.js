'use strict';

const BUTTONS = {
  SAVE: 'Save',
  EDIT: 'Edit',
  CANCEL: 'Cancel',
  REMOVE: 'Remove',
  ADD: 'Add',
};

let nameErr = '';
let phoneErr = '';

class UsersManager {
  constructor() {
    this.nameEl = document.getElementById('new-name');
    this.phoneEl = document.getElementById('new-phone');
    this.initListeners();
  }

  initListeners() {
    this.initAddUserListener();
    this.initNewNameChangeListener();
    this.initNewPhoneChangeListener();
  }

  initNewNameChangeListener() {
    this.nameEl.addEventListener('input', (event) => {
      UsersManager.clearNameErr();
    });
  }

  initNewPhoneChangeListener() {
    this.phoneEl.addEventListener('input', (event) => {
      UsersManager.clearPhoneErr();
    });
  }

  initAddUserListener() {
    const addUserBtn = document.getElementsByClassName('add-user-btn')[0];
    addUserBtn.addEventListener('click', () => {
      if (!UsersManager.validate(this.nameEl.value, this.phoneEl.value)) {
        this.showErrors();
        return;
      }
      // POST request to server
      UsersManager.addRow(this.nameEl.value, this.phoneEl.value);
      this.clearInputs();
    });
  }

  showErrors() {
    if (nameErr) {
      const nameError = document.getElementsByClassName('name-err')[0];
      nameError.innerHTML = nameErr;
    }
    if (phoneErr) {
      const phoneError = document.getElementsByClassName('phone-err')[0];
      phoneError.innerHTML = phoneErr;
    }
  }

  static validate(name, phone) {
    UsersManager.clearErrors();
    if (!name) {
      nameErr = 'Please enter new name';
    }
    if (phone && !UsersManager.validatePhone(phone)) {
      phoneErr = "Allowed only digits and '+' '-'";
    }
    return !nameErr && !phoneErr;
  }

  static validatePhone(phone) {
    const phoneRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return phone.match(phoneRegexp);
  }

  static clearErrors() {
    this.clearNameErr();
    this.clearPhoneErr();
  }

  static clearNameErr() {
    if (nameErr) {
      nameErr = '';
      const nameError = document.getElementsByClassName('name-err')[0];
      nameError.innerHTML = nameErr;
    }
  }

  static clearPhoneErr() {
    if (phoneErr) {
      phoneErr = '';
      const phoneError = document.getElementsByClassName('phone-err')[0];
      phoneError.innerHTML = phoneErr;
    }
  }

  static deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    // Delete request to server
    row.parentNode.removeChild(row);
  }

  static editRow(btn) {
    if (btn.innerText === BUTTONS.SAVE) {
      return UsersManager.saveEdit(btn);
    }
    UsersManager.startEdit(btn);
  }

  static saveEdit(btn) {
    const row = btn.parentNode.parentNode;
    const rowIndex = row.rowIndex;
    const editedName = row.children[0].children[0].value;
    const editedPhone = row.children[1].children[0].value;
    if (UsersManager.validate(editedName, editedPhone)) {
      UsersManager.deleteRow(btn);
      UsersManager.addRow(editedName, editedPhone, rowIndex - 1);
      return;
    }
    if (nameErr) {
      row.children[0].children[0].style.border = '1px solid red';
    }
    if (phoneErr) {
      row.children[1].children[0].style.border = '1px solid red';
    }
  }

  static startEdit(btn) {
    const row = btn.parentNode.parentNode;
    const children = row.children;

    const name = children[0].innerText;
    children[0].innerHTML = "<input id='edit-name' type = 'text' value = ''/>";
    const editNameEl = document.getElementById('edit-name');
    editNameEl.focus();
    editNameEl.value = name;

    children[1].innerHTML = "<input type = 'text' value = '" + children[1].innerText + "'/>";

    children[2].children[0].innerText = BUTTONS.SAVE;
    children[2].children[1].style.display = 'none';
  }

  static addRow(name, phone, rowIndex = -1) {
    const tableRef = document.getElementById('users-table').getElementsByTagName('tbody')[0];
    const newRow = tableRef.insertRow(rowIndex);
    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    const actionsCell = newRow.insertCell(2);

    nameCell.appendChild(document.createTextNode(name));
    phoneCell.appendChild(document.createTextNode(phone));
    actionsCell.className = 'users-table-actions';
    actionsCell.appendChild(UsersManager.createBtn(BUTTONS.EDIT));
    actionsCell.appendChild(UsersManager.createBtn(BUTTONS.REMOVE));
  }

  static createBtn(btnText) {
    const btn = document.createElement('BUTTON');
    btn.innerHTML = btnText;
    btn.addEventListener(
      'click',
      function () {
        btnText === BUTTONS.REMOVE ? UsersManager.deleteRow(this) : UsersManager.editRow(this);
      },
      false
    );
    return btn;
  }

  clearInputs() {
    this.nameEl.value = '';
    this.phoneEl.value = '';
  }
}

const usersMgr = new UsersManager();
