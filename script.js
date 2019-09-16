window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Let the script begin");
  getJson();
}

let students = [];
let dest = document.querySelector(".students");
let temp = document.querySelector(".temp");
let popup = document.querySelector("#indhold");
let popTemp = document.querySelector(".popuptemp");
let filterHouse = "all";

async function getJson() {
  const url = "http://petlatkea.dk/2019/students1991.json";
  const studentsJson = await fetch(url);
  students = await studentsJson.json();

  // prepareStudents(students);
  showStudents();
}

function showStudents() {
  dest.textContent = "";
  students.forEach(student => {
    const split = student.fullname.split(" ");
    console.log(split);
    if (filterHouse == "all" || filterHouse == student.house) {
      console.log(filterHouse);
      let klon = temp.cloneNode(true).content;
      let firstName = split[0];
      let lastName = split[1];
      klon.querySelector("[data-field=name]").textContent =
        firstName + " " + lastName;
      klon.querySelector("[data-field=house]").textContent = student.house;
      dest.appendChild(klon);

      studentPopup(student);
    }
  });
}

function studentPopup(student) {
  dest.lastElementChild.addEventListener("click", () => {
    let klonTwo = popTemp.cloneNode(true).content;
    klonTwo.querySelector("h3").textContent = student.fullname;
    klonTwo.querySelector(".pop-house-desc").textContent = student.house;
    popup.appendChild(klonTwo);

    document.querySelector("#overlay").style.display = "block";
  });
}

document.querySelector("#luk").addEventListener("click", () => {
  document.querySelector("#overlay").style.display = "none";
  showStudent();
});

function showStudent() {
  popup.innerHTML = "";
}

document.querySelectorAll(".filter").forEach(but => {
  but.addEventListener("click", filtrering);
});

function filtrering() {
  document.querySelectorAll(".filter").forEach(but => {
    but.classList.remove("valgt");
  });
  this.classList.add("valgt");
  filterHouse = this.getAttribute("data-house");
  showStudents();
}

// Skal lave sorteting når man trykker på knap
//document.querySelector(".firstname").addEventListener("click", () => {
//  student.sort((a, z) => {
//    return a.fullname.localeCompare(z.fullname);

//Sortering Lastname
//Split navn så man kan få fat i først bogstav efter mellemrum
//sorter på det første bogstav efter mellemrum når man trykker på knap

//Sorting House
