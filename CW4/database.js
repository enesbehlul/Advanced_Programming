class Course {
    constructor(label,time,date,rooms){
        this.label = label
        this.time = time
        this.date = date
        this.rooms = rooms
    }
    toString(){
        return this.label
    }
}

class Student {
    constructor(id,label,gpa,courses){      
        this.id = id
        this.label = label
        this.gpa = gpa
        this.courses = courses
    }
    toString(){
        return this.id + ""
    }
}
