// Store student records as objects
var students = [];

// DOM references
var form = document.getElementById("studentForm");
var studentGrid = document.getElementById("studentGrid");
var emptyState = document.getElementById("emptyState");
var namesPanel = document.getElementById("namesPanel");
var namesList = document.getElementById("namesList");
var toggleNamesBtn = document.getElementById("toggleNamesBtn");
var removeLastBtn = document.getElementById("removeLastBtn");
var sampleBtn = document.getElementById("sampleBtn");
var studentCount = document.getElementById("studentCount");
var registerCount = document.getElementById("registerCount");
var statusMessage = document.getElementById("statusMessage");

var nameInput = document.getElementById("name");
var matricInput = document.getElementById("matric");
var levelInput = document.getElementById("level");
var departmentInput = document.getElementById("department");

var matricPattern = /^\d{2}\/\d{9}$/;

// Event listeners
form.addEventListener("submit", addStudent);
toggleNamesBtn.addEventListener("click", toggleNames);
removeLastBtn.addEventListener("click", removeLast);
sampleBtn.addEventListener("click", addSampleStudents);

// Small functions
function addStudent(event) {
  event.preventDefault();

  clearErrors();

  var name = nameInput.value.trim();
  var matric = matricInput.value.trim();
  var level = levelInput.value;
  var department = departmentInput.value.trim();

  var isValid = true;

  if (!validateName(name)) {
    showError("name", "Name must be at least 2 characters.");
    isValid = false;
  }

  if (!validateMatric(matric)) {
    showError("matric", "Must match 23/024145123 and be unique.");
    isValid = false;
  }

  if (!validateLevel(level)) {
    showError("level", "Please choose a level.");
    isValid = false;
  }

  if (!validateDepartment(department)) {
    showError("department", "Department must be at least 2 characters.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  var student = {
    name: name,
    matric: matric,
    level: level + " Level",
    department: department
  };

  students.push(student);
  form.reset();
  render();
  showStatus(name + " was added.", "success");
}

function removeLast() {
  if (students.length === 0) {
    return;
  }

  var removedStudent = students.pop();
  render();
  showStatus(removedStudent.name + " was removed.", "success");
}

function matricExists(matric) {
  for (var i = 0; i < students.length; i++) {
    if (students[i].matric === matric) {
      return true;
    }
  }

  return false;
}

function validate(event) {
  // reserved for future use, not required by app flow
}

function validateName(name) {
  return name.length >= 2;
}

function validateMatric(matric) {
  if (!matricPattern.test(matric)) {
    return false;
  }

  return !matricExists(matric);
}

function validateLevel(level) {
  return level !== "";
}

function validateDepartment(department) {
  return department.length >= 2;
}

function render() {
  studentGrid.innerHTML = "";
  emptyState.style.display = students.length === 0 ? "block" : "none";
  removeLastBtn.disabled = students.length === 0;

  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var card = document.createElement("article");
    card.className = "student-card";

    if (i === students.length - 1) {
      card.classList.add("last-added");
    }

    var number = String(i + 1).padStart(2, "0");

    var cardInner =
      '<div class="card-header">' +
      '<span class="card-number">No. ' + number + "</span>" +
      '<span class="card-level">' + student.level + "</span>" +
      "</div>";

    if (i === students.length - 1) {
      cardInner += '<div class="card-last-tag">Last added</div>';
    }

    cardInner +=
      '<div class="card-body">' +
      '<h3 class="card-name">' + escapeHtml(student.name) + "</h3>" +
      '<p class="card-matric">' + escapeHtml(student.matric) + "</p>" +
      '<p class="card-department">' + escapeHtml(student.department) + "</p>" +
      "</div>";

    card.innerHTML = cardInner;
    studentGrid.appendChild(card);
  }

  updateCount();
  updateNamesPanel();
}

function updateCount() {
  var count = students.length;
  var label = count === 1 ? "student" : "students";

  studentCount.textContent = count + " " + label;
  registerCount.textContent = count;
}

function toggleNames() {
  namesPanel.classList.toggle("hidden");
  updateNamesPanel();
}

function updateNamesPanel() {
  namesList.innerHTML = "";

  if (students.length === 0) {
    var empty = document.createElement("p");
    empty.className = "names-empty";
    empty.textContent = "No students added yet.";
    namesList.appendChild(empty);
    return;
  }

  for (var i = 0; i < students.length; i++) {
    var chip = document.createElement("span");
    chip.className = "name-chip";
    chip.textContent = students[i].name;
    namesList.appendChild(chip);
  }
}

function addSampleStudents() {
  var sampleStudents = [
    { name: "Effa Divine", matric: "23/024145123", level: "300", department: "Computer Science" },
    { name: "Bassey Joy", matric: "23/024145124", level: "300", department: "Accounting" },
    { name: "Ikechukwu Emeka", matric: "23/024145125", level: "300", department: "Mass Communication" }
  ];

  for (var i = 0; i < sampleStudents.length; i++) {
    var sample = sampleStudents[i];
    var student = {
      name: sample.name,
      matric: sample.matric,
      level: sample.level + " Level",
      department: sample.department
    };
    students.push(student);
  }

  render();
  showStatus("Sample students added.", "success");
}

function showError(fieldName, message) {
  var field = document.querySelector('[name="' + fieldName + '"]');
  var errorBox = document.querySelector('[data-error-for="' + fieldName + '"]');

  if (field) {
    field.parentElement.classList.add("error");
  }

  if (errorBox) {
    errorBox.textContent = message;
  }
}

function clearErrors() {
  var errorFields = document.querySelectorAll(".field");
  for (var i = 0; i < errorFields.length; i++) {
    errorFields[i].classList.remove("error");
  }

  var messages = document.querySelectorAll(".error-message");
  for (var i = 0; i < messages.length; i++) {
    messages[i].textContent = "";
  }
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = "status-message " + type;

  setTimeout(function () {
    statusMessage.textContent = "";
    statusMessage.className = "status-message empty";
  }, 3000);
}

function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

render();
