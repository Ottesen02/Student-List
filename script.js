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

  showStudents();
}

function showStudents() {
  dest.innerHTML = "";
  students.forEach(student => {
    console.log(filterHouse);
    if (filterHouse == "all" || filterHouse == student.house) {
      let klon = temp.cloneNode(true).content;
      klon.querySelector("h2").innerHTML = student.fullname;
      klon.querySelector("p").innerHTML = student.house;
      dest.appendChild(klon);

      dest.lastElementChild.addEventListener("click", () => {
        let klonTwo = popTemp.cloneNode(true).content;
        klonTwo.querySelector("h3").student.fullname;
        klonTwo.querySelector(".pop-house-desc").student.house;
        popup.appendChild(klonTwo);

        document.querySelector("#overlay").style.display = "block";
      });

      // Skal lave sorteting når man trykker på knap
      //document.querySelector(".firstname").addEventListener("click", () => {
      //  student.sort((a, z) => {
      //    return a.fullname.localeCompare(z.fullname);

      //Sortering Lastname
      //Split navn så man kan få fat i først bogstav efter mellemrum
      //sorter på det første bogstav efter mellemrum når man trykker på knap

      //Sorting House

      function showStudent() {
        popup.innerHTML = "";
      }
    }
  });
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
