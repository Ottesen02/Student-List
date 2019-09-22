"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
let students = [];
let expelledList = [];
let filteredList = [];
let filterHouse = "all";

let sly = 10;
let gry = 8;
let huf = 9;
let rav = 8;

document.querySelector(".sly-counter").innerHTML = `Slytherin: ${sly}`;

const Student = {
  firstname: "-firstname-",
  middlename: "-middlename-",
  lastname: "-lastname-",
  house: "-house-",
  gender: "-gender-",
  image: "-image-",
  id: "-id-"
};

function start() {
  console.log("Let the script begin");

  getJson();
}

let dest = document.querySelector(".students");
let temp = document.querySelector(".temp");
let popup = document.querySelector("#indhold");
let popTemp = document.querySelector(".popuptemp");

async function getJson() {
  const url = "http://petlatkea.dk/2019/hogwartsdata/students.json";
  const studentsJson = await fetch(url);
  students = await studentsJson.json();

  prepareStudents(students);
}

function prepareStudents(students) {
  students.forEach(jsonObject => {
    const student = Object.create(Student);
    const fullnameTrim = jsonObject.fullname.trim();
    const houseTrim = jsonObject.house.trim();
    const fullnameSplit = fullnameTrim.split(" ");

    student.house = houseTrim.charAt(0).toUpperCase() + houseTrim.slice(1).toLowerCase();
    student.gender = jsonObject.gender.charAt(0).toUpperCase() + jsonObject.gender.slice(1).toLowerCase();
    student.id = create_UUID();
    if (fullnameSplit.length == 3) {
      student.firstname = fullnameSplit[0];
      student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
      student.middlename = fullnameSplit[1];
      student.middlename = student.middlename.charAt(0).toUpperCase() + student.middlename.slice(1).toLowerCase();
      student.lastname = fullnameSplit[2];
      student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
      student.image = `${student.lastname.toLowerCase()}_${student.firstname.substring(0, 1).toLowerCase()}.png`;
      if (student.firstname === "Ernest") {
        student.middlename = student.middlename.charAt(0) + student.middlename.charAt(1).toUpperCase() + student.middlename.slice(2).toLowerCase();
      }
    } else if (fullnameSplit.length == 2) {
      student.firstname = fullnameSplit[0];
      student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
      student.lastname = fullnameSplit[1];
      student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1).toLowerCase();
      if (student.lastname === "Patil") {
        student.image = `${student.lastname.toLowerCase()}_${student.firstname.toLowerCase()}.png`;
      } else if (student.firstname === "Justin") {
        student.image = `${student.lastname.substring(6).toLowerCase()}_${student.firstname.substring(0, 1).toLowerCase()}.png`;
        student.lastname = student.lastname.charAt(0).toUpperCase() + student.lastname.slice(1, 6).toLowerCase() + student.lastname.charAt(6).toUpperCase() + student.lastname.slice(7).toLowerCase();
      } else {
        student.image = `${student.lastname.toLowerCase()}_${student.firstname.substring(0, 1).toLowerCase()}.png`;
      }
    } else if (fullnameSplit.length == 1) {
      student.firstname = fullnameSplit[0];
      student.firstname = student.firstname.charAt(0).toUpperCase() + student.firstname.slice(1).toLowerCase();
      student.image = `nopicture.png`;
    }

    allStudents.push(student);
  });
  allStudents.push({
    firstname: "Martin",
    middlename: "-middlename-",
    lastname: "Ottesen",
    gender: "boy",
    house: "Slytherin",
    image: "ottesen_m.png",
    id: "-id-"
  });
  filteredList = filterBy("all");
  showStudents();
}

function setFilter() {
  filterHouse = this.dataset.house;
  filteredList = filterBy(filterHouse);
  showStudents();
}
function filterBy(filterHouse) {
  console.log(filterHouse);
  let listOfStudents = allStudents.filter(filterByHouse);

  function filterByHouse(student) {
    if (filterHouse == "all" || student.house == filterHouse) {
      return true;
    } else {
      return false;
    }
  }
  return listOfStudents;
}

document.querySelectorAll(".filter").forEach(but => {
  but.addEventListener("click", setFilter);
  but.addEventListener("click", filtrering);
});

function filtrering() {
  document.querySelectorAll(".filter").forEach(but => {
    but.classList.remove("valgt");
  });
  this.classList.add("valgt");
  5;
  filterHouse = this.getAttribute("data-house");
  showStudents();
}

function showStudents() {
  dest.innerHTML = "";
  filteredList.forEach(student => {
    let klon = temp.cloneNode(true).content;
    if (student.lastname == "-lastname-") {
      klon.querySelector("[data-field=name]").textContent = student.firstname;
    } else if (student.middlename == "-middlename-") {
      klon.querySelector("[data-field=name]").textContent = student.firstname + " " + student.lastname;
    } else {
      klon.querySelector("[data-field=name]").textContent = student.firstname + " " + student.middlename + " " + student.lastname;
    }
    klon.querySelector("[data-field=house]").innerHTML = student.house;
    klon.querySelector("[data-field=image]").src = `images/${student.image}`;
    klon.querySelector(".expell").dataset.id = student.id;
    klon.querySelector(".student").dataset.id = student.id;
    klon.querySelector(".expell").addEventListener("click", expellStudent);
    klon.querySelector(".student").addEventListener("click", studentPopup);

    dest.appendChild(klon);
  });
  console.log(filteredList);
}

function expellStudent(e) {
  const el = e.target;
  const grandParent = el.parentElement;
  const id = grandParent.dataset.id;
  console.log(grandParent);

  if (el.dataset.action === "remove") {
    const index = filteredList.findIndex(findFunction);

    function findFunction(student) {
      if (student.id === id) {
        return true;
      } else {
        return false;
      }
    }
    allStudents.splice(index, 1);

    //* push to expelled list - Doesnt work
    expelledList.push(index);

    //* Remove container with student
    grandParent.remove();

    //* Show number of students on expelled list
    document.querySelector("#expelled-counter").innerHTML = `Expelled Students: ${expelledList.length}`;

    //* call expelled list function
    document.querySelector("#counter").innerHTML = `Current Students: ${allStudents.length}`;
  }
}

// TODO: Expelled list call

//* import data from filtered list

//* Display array of expelled students

// TODO: Hacked Expelled list call

//* if student firstname === Martin

//* display alert instead of remove

function studentPopup() {
  let studentID = this.dataset.id;
  console.log(studentID);

  allStudents.forEach(student => {
    let klon = popTemp.cloneNode(true).content;
    if (student.id === studentID) {
      if (student.lastname == "-lastname-") {
        klon.querySelector("[data-field=popup-name]").textContent = student.firstname;
      } else if (student.middlename == "-middlename-") {
        klon.querySelector("[data-field=popup-name]").textContent = student.firstname + " " + student.lastname;
      } else {
        klon.querySelector("[data-field=popup-name]").textContent = student.firstname + " " + student.middlename + " " + student.lastname;
      }
      klon.querySelector("[data-field=house-name]").innerHTML = student.house;
      klon.querySelector("[data-field=popup-image]").src = `images/${student.image}`;

      //* click button to add to squad
      klon.querySelector(".inq").addEventListener("click", inqSquad);

      //* click button to make prefect
      klon.querySelector(".prefect").addEventListener("click", prefect);

      if (student.house === "Gryffindor") {
        document.querySelector("#indhold").className = "gryffindor";
      } else if (student.house === "Slytherin") {
        document.querySelector("#indhold").className = "slytherin";
      } else if (student.house === "Hufflepuff") {
        document.querySelector("#indhold").className = "hufflepuff";
      } else {
        document.querySelector("#indhold").className = "ravenclaw";
      }
      popup.appendChild(klon);

      document.querySelector("#overlay").style.display = "block";
    }
  });
}

document.querySelector("#luk").addEventListener("click", () => {
  document.querySelector("#overlay").style.display = "none";
  clearPopup();
});

function clearPopup() {
  popup.innerHTML = "";
}

let sortby = "firstname";

document.querySelectorAll("#sort").forEach(option => {
  option.addEventListener("change", sortBy);
});

function sortBy() {
  sortby = this.value;

  if (sortby == "firstname") {
    console.log(sortby);
    filteredList.sort(function(a, b) {
      return a.firstname.localeCompare(b.firstname);
    });
  } else if (sortby == "lastname") {
    console.log(sortby);
    filteredList.sort(function(a, b) {
      return a.lastname.localeCompare(b.lastname);
    });
  } else if (sortby == "house") {
    console.log(sortby);
    filteredList.sort(function(a, b) {
      return a.house.localeCompare(b.house);
    });
  } else if (sortby == "none") {
  }

  showStudents();
}

// TODO MAKE PREFECT
//* function prefect
function prefect() {
  //* check if student is boy or girl

  //* check if there is already a prefect boy and girl in the house

  //* if there is already a boy or a girl prefect alert

  //* if there is space for a prefect promote to prefect
  document.querySelector(".prefect").src = "prefect.png";
}

//* click button to remove prefect status

// TODO: MAKE INQUSITORIAL SQUAD
//* function inqusitorialSquad

function inqSquad() {
  console.log("inq");

  //* change squad status to in squad
  document.querySelector(".inq").src = "inq.png";

  //* click button to remove from squad

  //* call function inqHacked
}

// TODO: HACK INQUSITORIAL SQUAD
//* function inqHacked

//* set timeout to 3000ms

//* when time is up remove from inq squad

// TODO: MAKE BLOOD STATUS
//* function bloodStatus

//* import list with family names

//* make variable with pure blood names

//* make variable with half blood names

//* run student lastname against variables

//* if lastname === pure blood change status to pure blood

//* if lastname === half blood change status to half blood

//* if lastname === none change status to muggle

// TODO HACK BLOOD STATUS
//* function hackBloodStatus

//* if blood status === pureblood set blood status to to random

//* if blood status === half blood set blood status to pure blood

//* if blood status === muggle set blood status to pure blood

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

console.log(create_UUID());
