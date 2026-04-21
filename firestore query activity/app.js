// console.log(firebase);

// Add a person to the database
// when the user clicks on the Submit button, we collect the person details from
// the form and send that over to Firebase

document.querySelector("#submit").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let color = document.querySelector("#favcolor").value;

  // store user details in object format
  let user = {
    name: name,
    age: parseInt(age),
    color: color,
  };

  // save the user into the DB in a collection called mypeople
  db.collection("mypeople")
    .add(user)
    .then(() => {
      alert("New user added!");
      show_people();
    });
});

// show people stored in our DB

function show_people() {
  // data retrieval
  db.collection("mypeople")
    .get()
    .then((mydata) => {
      let docs = mydata.docs;

      let html = ``;
      //   loop though the docs array
      docs.forEach((d) => {
        // console.log(d.data().name);
        html += `<p class="p-3">${d.data().name} is ${
          d.data().age
        } years old. <span class="subtitle m-4">${d.id}</span> 
        <button class="button is-danger is-pulled-right" onclick="del_doc('${
          d.id
        }')">X</button>
        
        </p>`;
      });
      //   console.log(html);

      // show all users in on index.html
      document.querySelector("#all_people").innerHTML = html;
    });
}

// call the function
show_people();

// a function to delete a specific user from the database
function del_doc(docid) {
  db.collection("mypeople")
    .doc(docid)
    .delete()
    .then(() => {
      alert("user deleted!");
      // show the updated list of all people stored in the database
      show_people();
    });
}

// update jackie's age
// we need the doc ID to update a document
// db.collection("mypeople")
//   .doc("CoHoFRKbYXopMgoA4zjq")
//   .update({
//     age: 35,
//     color: "white",
//     hobbies: ["swimming", "drawing"],
//   });

// jackie has a new hobby - tennis

// db.collection("mypeople")
//   .doc("CoHoFRKbYXopMgoA4zjq")
//   .update({
//     age: 35,
//     color: "white",
//     hobbies: firebase.firestore.FieldValue.arrayUnion("tennis"),
//   });

// jackie has pizza as her favorite food, madison as her favorite city

// db.collection("mypeople")
// .doc("CoHoFRKbYXopMgoA4zjq")
// .update({
//   favorites: {
//     food: "pizza",
//     city: "madison",
//   },
// });

// add swimming, soocer, and reading as hobbies for john
db.collection("mypeople")
  .doc("CoHoFRKbYXopMgoA4zjq")
  .update({
    hobbies: ["swimming", "soccer", "reading"],
  });

// add soccer as a hobby for Sally
// db.collection("mypeople")
//   .doc("2aaoNlQUxyqtSvoEKAtG")
//   .update({
//     hobbies: ["soccer"],
//   });

// show all people with age less than 25
// age is a numberic field

// db.collection("mypeople")
//   .where("age", "<", 25)
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // loop through the mydocs array: array contains the documents
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// show all people with favorite color of red and name is sally
// 2 conditions - equality comparison

// db.collection("mypeople")
//   .where("color", "==", "red")
//   .where("name", "==", "sally")
//   .get()
//   .then((data) => {
//     let mydocs = data.docs;
//     // loop through the mydocs array: array contains the documents
//     mydocs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// show all people named sally or john or pete

// Task 1
// Adding the teams collection to firebase

// let teams = [
//   {
//     teamName: "Real Madrid",
//     city: "Madrid",
//     country: "Spain",
//     topScorers: ["Ronaldo", "Benzema", "Hazard"],
//     worldwideFans: 798,
//     isNationalTeam: false,
//   },
//   {
//     teamName: "Barcelona",
//     city: "Barcelona",
//     country: "Spain",
//     topScorers: ["Messi", "Suarez", "Puyol"],
//     worldwideFans: 738,
//     isNationalTeam: false,
//   },
//   {
//     teamName: "Manchester United",
//     city: "Manchester",
//     country: "England",
//     topScorers: ["Cantona", "Rooney", "Ronaldo"],
//     worldwideFans: 755,
//     isNationalTeam: false,
//   },
//   {
//     teamName: "Manchester City",
//     city: "Manchester",
//     country: "England",
//     topScorers: ["Sterling", "Aguero", "Haaland"],
//     worldwideFans: 537,
//     isNationalTeam: false,
//   },
//   {
//     teamName: "Brazil National Team",
//     city: "Not applicable",
//     country: "Brazil",
//     topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
//     worldwideFans: 950,
//     isNationalTeam: true,
//   },
//   {
//     teamName: "Argentina national team",
//     city: "Not applicable",
//     country: "Argentina",
//     topScorers: ["Messi", "Batistuta", "Maradona"],
//     worldwideFans: 888,
//     isNationalTeam: true,
//   },
//   {
//     teamName: "Atletico Madrid",
//     city: "Madrid",
//     country: "Spain",
//     topScorers: ["Aragonés", "Griezmann", "Torez"],
//     worldwideFans: 400,
//     isNationalTeam: false,
//   },
// ];

// teams.forEach((team) => {
//   db.collection("teams")
//     .add(team)
//     .then(() => {
//       console.log(team.teamName + " added");
//     });
// });

// Task 2: Queries

// 1. Show all teams in Spain
db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    console.log("1. Teams in Spain");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 2. Show all teams in Madrid, Spain
db.collection("teams")
  .where("city", "==", "Madrid")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    console.log("2. Teams in Madrid, Spain");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 3. Show all national teams
db.collection("teams")
  .where("isNationalTeam", "==", true)
  .get()
  .then((data) => {
    console.log("3. National teams");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 4. Show all teams not in Spain
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    console.log("4. Teams not in Spain");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 5. Show all teams not in Spain or England
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    console.log("5. Teams not in Spain or England");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 6. Show teams in Spain with >700 fans
db.collection("teams")
  .where("country", "==", "Spain")
  .where("worldwideFans", ">", 700)
  .get()
  .then((data) => {
    console.log("6. Spain teams with >700 fans");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 7. Show teams with fans between 500 and 600
db.collection("teams")
  .where("worldwideFans", ">=", 500)
  .where("worldwideFans", "<=", 600)
  .get()
  .then((data) => {
    console.log("7. Teams with fans between 500-600");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 8. Show teams with Ronaldo
db.collection("teams")
  .where("topScorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    console.log("8. Teams with Ronaldo");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// 9. Show teams with Ronaldo / Maradona / Messi
db.collection("teams")
  .where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    console.log("9. Teams with Ronaldo / Maradona / Messi");
    data.docs.forEach((d) => {
      console.log(d.data());
    });
  });

// Task 3: Updating Data

// Real Madrid update
db.collection("teams")
  .where("teamName", "==", "Real Madrid")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          teamName: "Real Madrid FC",
          worldwideFans: 811,
          topScorers: ["Ronaldo", "Benzema", "Crispo"],
        })
        .then(() => {
          console.log("Real Madrid updated");
        });
    });
  });

// Barcelona update
db.collection("teams")
  .where("teamName", "==", "Barcelona")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          teamName: "FC Barcelona",
          worldwideFans: 747,
          topScorers: ["Messi", "Suarez", "Deco"],
        })
        .then(() => {
          console.log("Barcelona updated");
        });
    });
  });

// Add colors to Real Madrid FC
db.collection("teams")
  .where("teamName", "==", "Real Madrid FC")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          color: {
            home: "White",
            away: "Black",
          },
        })
        .then(() => {
          console.log("Real Madrid colors added");
        });
    });
  });

// Add colors to FC Barcelona
db.collection("teams")
  .where("teamName", "==", "FC Barcelona")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          color: {
            home: "Red",
            away: "Gold",
          },
        })
        .then(() => {
          console.log("Barcelona colors added");
        });
    });
  });

// Update away color for Real Madrid FC
db.collection("teams")
  .where("teamName", "==", "Real Madrid FC")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          "color.away": "Purple",
        })
        .then(() => {
          console.log("Real Madrid away color updated");
        });
    });
  });

// Update away color for FC Barcelona
db.collection("teams")
  .where("teamName", "==", "FC Barcelona")
  .get()
  .then((data) => {
    data.forEach((docItem) => {
      db.collection("teams")
        .doc(docItem.id)
        .update({
          "color.away": "Pink",
        })
        .then(() => {
          console.log("Barcelona away color updated");
        });
    });
  });
