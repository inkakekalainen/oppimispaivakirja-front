

const aihe = document.getElementById("topic");

const kuvaus = document.getElementById("description")
const lisatieto = document.getElementById("source")
const valmis = document.getElementById("complete")
const aloitettu = document.getElementById("creationDate")
const lopetettu = document.getElementById("completionDate")
const listaus = document.getElementById("lista")


function haekaikki(){
    fetch('http://localhost:8080/api/aihe')
        .then(resp=>resp.json())
        .then(aiheet=>{
            while (listaus.firstChild) listaus.removeChild(listaus.firstChild);
            listaus.innerHTML += `<li>Aihe`
            const aiheul = document.createElement('ul');
            listaus.appendChild(aiheul)
            for (let aihe of aiheet)
            aiheul.innerHTML += `<li>${JSON.stringify(aihe)}`
        })
}

document.getElementById("tallenna").onclick = function () {
    var title = document.getElementById("topic").value
    var description = document.getElementById("description").value
    var source = document.getElementById("source").value
    var done = document.getElementById("done").value
    var notDone = document.getElementById("notDone").value
    var  creationDate = document.getElementById("creationDate").value
    var completionDate = document.getElementById("completionDate").value
//var complete = document.getElementByName("kesken");
    var boolean

    if(document.getElementById("done") === true) {
        boolean = true;
    } else {
        boolean = false
    }
    fetch('http://localhost:8080/api/aihe', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({title,  description,  source,  boolean, creationDate, completionDate})

        })
      /*  const content = await rawResponse.json();*/

        //console.log(content);
    .then(()=>haekaikki());
}
document.getElementById("poista").onclick = function () {
    var id = document.getElementById("poistettava").value
    fetch('http://localhost:8080/api/aihe/' + id, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(()=>haekaikki());
}


haekaikki();