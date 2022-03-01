const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

function createPage(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log("resultado", res);
      callback(res);
    });
}

createPage((value) => {
  let array = value;
  createTableCorrelation(array);
  crateTableEvents(array);
});

function crateTableEvents(array) {
  for (let i = 0; i < array.length; i++) {
    let infoRow = array[i];
    let infoEvents = infoRow.events;

    let row = document.createElement("tr");
    let numEvent = document.createElement("td");
    let events = document.createElement("td");
    let squirrel = document.createElement("td");

    let nodeNumEvent = document.createTextNode(i + 1);
    let nodeSquirrel = document.createTextNode(infoRow.squirrel);

    let txtEvents = "";
    for (let j = 0; j < infoEvents.length; j++) {
      txtEvents = txtEvents + infoEvents[j] + ", ";
    }
    let nodeEvents = document.createTextNode(txtEvents);

    numEvent.appendChild(nodeNumEvent);
    events.appendChild(nodeEvents);
    squirrel.appendChild(nodeSquirrel);

    row.appendChild(numEvent);
    row.appendChild(events);
    row.appendChild(squirrel);

    if (infoRow.squirrel) {
      row.style.background = "lightcoral";
    }

    document.getElementById("events").appendChild(row);
  }
}

function createTableCorrelation(array) {
  let correlation = {};
  for (let i = 0; i < array.length; i++) {
    let infoRow = array[i];
    let infoEvents = infoRow.events;
    let squirrel = infoRow.squirrel;

    for (let j = 0; j < infoEvents.length; j++) {
      if (!(infoEvents[j] in correlation)) {
        correlation[infoEvents[j]] = [
          [0, 0],
          [0, 0],
        ];
      }
    }
  }
  console.log(correlation);
}
