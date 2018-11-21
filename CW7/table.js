var database = new Database()
const ids = []
const url = "https://maeyler.github.io/JS/data/";
function readData(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(function(value){return value.text()}, report)
        .then(addStudents, report);
}
function addStudents(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {
      let std = parseStudent(s);
      let stu = new Student(std[0],std[1],std[2],std[3])
      ids.push(std[0])
      database.addStudent(std[0],stu)
    }
}
function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let list = [];
    for (let i=3; i<b.length; i++) 
        list.push(database.courses.get(b[i]));
    return [id, name, gpa, list];
}
function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}
function parseCourse(line) {
    let b = line.split("\t");
    let name = b[0], time = b[1], date = b[2];
    let classes = [];
    for (let i=3; i<b.length; i++) 
        classes.push(b[i]);
    return [name, time, date, classes];
}
function addCourses(txt) {
    let a = txt.split("\n");
    for (let s of a) {
      let crs = parseCourse(s);
      let cor = new Course(crs[0],crs[1],crs[2],crs[3])
      database.addCourse(crs[0], cor)
    }
}
function readCourses(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text(), report)
        .then(addCourses, report);
    return database;
}
