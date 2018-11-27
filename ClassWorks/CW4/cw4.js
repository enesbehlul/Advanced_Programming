"use strict";
const RDR2 = new FileReader();
RDR2.onload = function() { display(RDR2) };
function fileSelect(t) { 
//target t is the file selection HTMLInputElement
    let a = t.files; //display(t);
    if (a.length == 0) return;
    display(RDR2);
    if (a.length == 1) {
        let f = a[0]; display(f);
        MENU.displayFile(f)
    } else {
        display(a);
        let s = "";
        for (let f of a) 
            s += f.name+" "+f.size+" bytes "+NL;
        MENU.displayText(s)
    }
}

class CW4 extends Menu {
  constructor(stu,courses,dis,point,point3d) {
    super();
    var adPr = new Course("advancedPr", "15.00","25 oct","A103")
    var math = new Course("Maht", "09.00","25 oct","B121")
    var courses = []
    courses.push(adPr)
    courses.push(math)
    this.student = new Student(1, "Enes Behlül", 3.58, courses);
    this.courses = courses;
    this.dis = new Distance(16,10);
    this.point = new Point(3,4)
    this.point3d = new Point3D(3,4,5);
  }
  isTextFile(f) {
    console.assert(f instanceof File);
    return f.type.startsWith("text") || f.name.endsWith(".md")
         || f.name.endsWith(".js") || f.name.endsWith(".java");
  }
  displayFile(f) {
    console.assert(f instanceof File); let M = this;
    console.log(f.name+" "+f.size+" bytes "+f.type);
    if (f.type.startsWith("image")) {
        RDR2.onload = function(evt) {
            M.displayImage(RDR2.result)
        };
        RDR2.readAsDataURL(f);
    } else if (this.isTextFile(f)) {
        RDR2.onload = function(evt) {
            M.displayText(RDR2.result)
        };
        RDR2.readAsText(f);
    } else {
        this.displayText("Unknown")
    }
  }
  displayText(txt) {
    disp1.innerText = txt; disp2.src = ""; 
    return disp1
  }
  displayImage(url) {
    disp1.innerText = ""; disp2.src = url; 
    return disp2
  }
}

