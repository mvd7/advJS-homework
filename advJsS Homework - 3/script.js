console.log(`works`);

class Academy {
  constructor(name, start, end) {
    this.name = name;
    this.students = [];
    this.subjects = [];
    this.start = start;
    this.end = end;
    this.numberOfClasses = this.numberOfClassesFn();
  }

  addingStudent(student) {
    this.students.push(student);
  }

  addingSubject(subject) {
    this.subjects.push(subject);
  }

  numberOfClassesFn() {
    return this.subjects.length + 10;
  }

  printStudents() {
    this.students.forEach((student) => console.log(student));
  }

  printSubjects() {
    this.subjects.forEach((subjects) => console.log(subjects));
  }
}

class Subject {
  constructor(title, isElective, academy) {
    this.title = title;
    this.numberOfClasses = this.overrideClasses();
    this.isElective = isElective;
    this.academy = academy;
    this.students = [];
  }

  overrideClasses(classes) {
    return classes || 10;
  }
}

class Student {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = [];
    this.academy = null;
    this.currentSubject = null;
  }

  startAcademy(academy) {
    academy.addingStudent(`${this.firstName} ${this.lastName}`);
    this.academy = academy;
  }

  startSubject(subject) {
    subject.student = `${this.firstName} ${this.lastName}`;

    if (this.academy === null) {
      console.error("Something isn't right");
      return;
    }

    if (this.currentSubject !== null)
      this.completedSubjects.push(this.currentSubject);

    this.currentSubject = subject.title;
  }
}

//  SEDC ACADEMY

const SEDC = new Academy("SEDC", "17.11.2022", "17.11.2023");

const advJsSubject = new Subject("AdvJS", false, SEDC);

const emily = new Student("Emily", "Johnson", 23);
const michael = new Student("Michael", "Brown", 18);
const olivia = new Student("Olivia", "Davis", 19);

emily.startAcademy(SEDC);
michael.startAcademy(SEDC);
olivia.startAcademy(SEDC);

emily.startSubject(advJsSubject);
michael.startSubject(advJsSubject);
olivia.startSubject(advJsSubject);

SEDC.printStudents();

// RANDOM ACADEMY

const randomAcadamy = new Academy("Random", "12.10.2022", "12.10.2023");

const randomSubject = new Subject("idkSubject", true, randomAcadamy);

const sophia = new Student("Sophia", "Wilson", 29);
const alexander = new Student("Alexander", "Smith", 17);
const isabella = new Student("Isabella", "Taylor", 24);

sophia.startAcademy(randomAcadamy);
alexander.startAcademy(randomAcadamy);
isabella.startAcademy(randomAcadamy);

sophia.startSubject(randomSubject);
alexander.startSubject(randomSubject);
isabella.startSubject(randomSubject);

randomAcadamy.printStudents();
