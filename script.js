let students = [];
document.addEventListener("DOMContentLoaded", getJson);
async function getJson() {
  const url = "http://petlatkea.dk/2019/students1991.json";
  const studentsJson = await fetch(url);
  students = await studentsJson.json();

  showStudents();
}

function showStudents() {
  let dest = document.querySelector(".students");
  let temp = document.querySelector(".temp");

  students.forEach(student => {
    let klon = temp.cloneNode(true).content;
    klon.querySelector("h2").innerHTML = student.fullname;
    klon.querySelector("p").innerHTML = student.house;

    dest.appendChild(klon);
  });
}
