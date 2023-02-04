console.log(`?`);

const fetchStudents = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
    );
    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const calculateAvg = (data, i) => {
  return data.reduce((acc, student) => acc + student[i], 0) / data.length;
};

const ageOverUnder = (data) => {
  let over60 = data.filter((students) => students.age >= 60).length;
  if (over60 === 0) {
    over60 = `No students over 60`;
  }
  let under30 = data.filter((students) => students.age < 30).length;
  if (under30 === 0) {
    under30 = `No students under 30`;
  }
  return `Students over 60: ${over60} | Students under 30: ${under30}`;
};

const listOfStudents = (data) => {
  return data.filter(
    (students) => students.age > 30 && students.averageGrade > 3.5
  );
};

const artuhCador = (data) => {
  try {
    const findAruth = data.find(
      (students) =>
        students.firstName === `Artuh` && students.lastName === `Cador`
    );
    if (!findAruth) {
      throw new Error(`There is no student with that name.`);
    }

    return findAruth;
  } catch (error) {
    return error.message;
  }
};

const oldestAndYoungest = (data) => {
  const sortedData = data.sort((a, b) => a.age - b.age);
  return {
    min: sortedData[0],
    max: sortedData[data.length - 1],
  };
};

const longerThanEight = (data) => {
  const longer = data.filter((students) => students.lastName.length > 8);
  return longer;
};

const topTenFunction = (data) => {
  const top10 = data.sort((a, b) => (a.averageGrade = b.averageGrade));
  return top10;
};

const renderData = async () => {
  // FETCHING STUDENTS DATA
  const students = await fetchStudents();

  // Show the average age and average grade of all students combined
  const averageHTML = document.querySelector(`.average-age-grade`);
  const avgGrade = calculateAvg(students, `averageGrade`);
  const avgAge = calculateAvg(students, `age`);

  averageHTML.innerHTML += `<ul>
  <li>Average Grade: ${avgGrade.toFixed(2)}</li>
  <li>Average Age: ${avgAge.toFixed(2)}</li>
  </ul>`;

  // Show the number of students that are over 60 and the number of students that are under 30 years old
  const underOver = ageOverUnder(students);
  const overUnderHTML = document.querySelector(`.over-under`);
  overUnderHTML.innerHTML += `
  <p>${underOver}</p>
  `;
  // Create a list that will have the firstname lastname and city of the students that are over 30 and have an average grade of 4 and above
  const listStudentsHTML = document.querySelector(`.list-students`);
  const listStudents = listOfStudents(students);

  listStudents.forEach((student) => {
    listStudentsHTML.innerHTML += `
    <ul>
    <li>Name: ${student.firstName} ${student.lastName} | City: ${student.city}</li>
</ul>
    `;
  });

  // Find the student named Artuh Cador and display all of his information
  const findStudentHTML = document.querySelector(`.find-student`);
  const findAruth = artuhCador(students);
  findStudentHTML.innerHTML += `
  <p>${findAruth}</p>
  `;

  // Find the oldest and youngest student and display their information on the screen
  const youngestOldestHTML = document.querySelector(`.find-youngest-oldest`);
  const youngestOldest = oldestAndYoungest(students);

  youngestOldestHTML.innerHTML += `
  <ul>
  <li>Youngest: ${youngestOldest.min.firstName} ${youngestOldest.min.lastName} | Age :${youngestOldest.min.age} | City: ${youngestOldest.min.city}</li>
  <li>Oldest: ${youngestOldest.max.firstName} ${youngestOldest.max.lastName} | Age: ${youngestOldest.max.age} | City: ${youngestOldest.max.city}</li>
  </ul>
  `;

  // Show a list of the full names of students that have a last name longer than 8 characters
  const longerThanHTML = document.querySelector(`.longer-than`);
  const longerThan = longerThanEight(students);

  longerThan.forEach((student) => {
    longerThanHTML.innerHTML += `
    <ul>
    <li>Name: ${student.firstName} ${student.lastName} | City: ${student.city}</li>
</ul>
    `;
  });

  const topTenHTML = document.querySelector(`.top-ten`);
  const topTen = topTenFunction(students);
  const topTenArr = topTen.slice(0, 10);
  topTenArr.forEach((student) => {
    topTenHTML.innerHTML += `
  <ul>
    <li>Name: ${student.firstName} ${student.lastName} | Average Grade: ${student.averageGrade}</li>
</ul>`;
  });
};

renderData();
