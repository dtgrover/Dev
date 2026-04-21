// console.log("Hello Firebase!");

// storing different restaurants in firestore

// create restaurant objects, then those objects will become documents on firestore

let d10 = {
  id: "d10",
  name: "nonas kitchen",
  location: {
    city: "London",
    country: "uk",
  },
  style: ["italian", "chinese"],
};

// store the objects into firestore
// add() or set()

// db.collection("restaurants").add(d10);

// set() allows you to add your own doc ID

db.collection("restaurants").doc("d10").set(d10);

let d11 = {
  id: "d11",
  name: "pizza place",
  location: {
    city: "madison",
    country: "usa",
  },
  style: ["italian"],
  noise_level: "low",
  price_range: "average",
};

db.collection("restaurants").doc("d11").set(d11);

// retrieve data from a collection - get()
db.collection("restaurants")
  .get()
  .then((data) => {
    console.log(data.docs[0].data);
  });
