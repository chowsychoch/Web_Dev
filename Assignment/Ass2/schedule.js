console.log("hello")

function loadJson(RunFunc, arr) {
    let xmlhttp = new XMLHttpRequest();
    let url = "scheduling.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let result = JSON.parse(xmlhttp.responseText);
            console.log('I am running Func')
            RunFunc(result, arr)
        }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()

}
//call
loadJson(readJsonFile)


function readJsonFile(res) {

    //choose the sate first e.g. 2020-4-26
    let shown = `<select id="date" name="date" onchange="showFunc()">
    <option value="">Select</option>`;
    let day = ""
    //choose the timeslot after clicking a specific date 
    let timeSlot = ""
    // read date 
    for (let i in res) {

        console.log(res[i].date)
        console.log(res[i].day)
        shown += `
        <option value="${res[i].date}"> ${res[i].date} </option> 
        `
        day += `<div class="day">${res[i].day}</div>`
        // access 0 index of slots e.g. {"ba449917":{"slotId"}:"ba449917"}}
        slots = res[i].slots
        console.log(Object.values(slots))
        slot = Object.values(slots)
        timeSlot += `<select id="${res[i].day}" class="date" name="${res[i].day}"><option value="">Selectssss</option>`
        for (let key of slot) {
            console.log(key.time)
            timeSlot += `<option key="${res[i].day}" value="${key.time}">${key.time}</option>`
        }
        timeSlot += `</select>`
    }
    console.log(shown)
    console.log(timeSlot)
    console.log(document.getElementById("schedule-picker"))
    document.getElementById("schedule-picker").innerHTML = shown + `</select>` + timeSlot + `
    
    <input class="btn" type="submit" value="Submit"/>` + day
    
}

//Click to show the timeslot of that date 
function showFunc() {
    let dateChose = document.getElementById("date").value;
    console.log(dateChose)

    if (dateChose == "2020-04-25") {
        console.log('hahha')
        document.getElementById("Saturday").style.display = "block";
    } else {
        document.getElementById("Saturday").style.display = "none"
    }

    if (dateChose == "2020-04-26") {
        console.log('hahha')
        document.getElementById("Sunday").style.display = "block";
    } else {
        document.getElementById("Sunday").style.display = "none"
    }

    if (dateChose == "2020-04-27") {
        console.log('hahha')
        document.getElementById("Monday").style.display = "block";
    } else {
        document.getElementById("Monday").style.display = "none"
    }

    if (dateChose == "2020-04-28") {
        console.log('hahha')
        document.getElementById("Tuesday").style.display = "block";
    } else {
        document.getElementById("Tuesday").style.display = "none"
    }

    if (dateChose == "2020-04-29") {
        console.log('hahha')
        document.getElementById("Wednesday").style.display = "block";
    } else {
        document.getElementById("Wednesday").style.display = "none"
    }

    if (dateChose == "2020-04-30") {
        console.log('hahha')
        document.getElementById("Thursday").style.display = "block";
    } else {
        document.getElementById("Thursday").style.display = "none"
    }


}


const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
    // e.reset();
});

formElem.addEventListener('formdata', (e) => {
    console.log('formdata fired');
    // Get the form data from the event object
    let data = e.formData;
    console.log(data.values)
    let arr = []
    for (let value of data.values()) {
        if (value != "") {
            console.log('resultsssss', value);
            arr.push(value)
            console.log(arr)
        }
    }
    if (arr.length == 0){
        alert("Please select a day.")
    }
    else if (arr.length > 2 ){
        alert ('You might have enter two or more timeslots. Please unselect the timeslots. hints: go back to previous date to check :))')
    }
    // // arr created above pass as para to loadJson i.e. make sure loadJson has accepted para too
    loadJson(readUserResult, arr)
});


function readUserResult(res, arr) {

    let wrapper = document.getElementById("UserResult")
    console.log(arr[0])
    console.log('I am here')
    let day = ""
    let slots = ""
    let result_slot = ""
    let btn = ""
    for (let i in res) {
        console.log(res[i].date)
        if (arr[0] == res[i].date) {
            let userDate = res[i].date
            console.log('hehehehhe', userDate)
            // day selected 
            day += `<div class="day">${res[i].date}</div>`

            //get the date and return to specific result 
            slots = res[i].slots
            slots = Object.values(slots)
            console.log(slots)


            for (let slot of slots) {

                console.log(slot.time)
                if (slot.time == arr[1]) {
                    ////
                    for (let session of slot.sessions) {
                        //print out sessions 
                        // title, time, location, room type 
                        result_slot += `<div class="filterDiv ${session.type} result"> 
                        <div class="session-title">${session.title}</div>
                        <button class="session-btn" name="${session.sessionId}" onclick="readSubmission('${session.sessionId}')">More info</button>
                        <div class="${session.sessionId} sessionId"></div>
                        <div class="room"><img src="./venue.png" alt="room" />${session.room}</div>
                        <div class="time"><img src="./time.png" alt="time" />${session.time}</div>
                        <div class="type"><img src="./info.png" alt="info" />${session.type}</div>
                        </div>
                        `
                        // <div>${session.type}<div>
                        console.log(session.title)
                    }
                    // wrapper.innerHTML = result_slot
                    ///if no input for timeslot arr == 1 
                } else if (arr.length == 1) {
                    //check input timeslot 
                    console.log(slot)
                    console.log('Yes I ammm herererererer')
                    console.log(slot.sessions)
                    for (let session of slot.sessions) {
                        //print out sessions 
                        // title, time, location, room type 
                        result_slot += `<div class="filterDiv ${session.type} result"> 
                        <div class="session-title">${session.title}</div>
                        <button class="session-btn" name="${session.sessionId}" onclick="readSubmission('${session.sessionId}')">More info</button>
                        <div class="${session.sessionId} sessionId"></div>
                        <div class="room"><img src="./venue.png" alt="room" />${session.room}</div>
                        <div class="time"><img src="./time.png" alt="time" />${session.time}</div>
                        <div class="type"><img src="./info.png" alt="info" />${session.type}</div>
                        </div>
                        `
                        console.log(session.title)
                    }
                    // wrapper.innerHTML = result_slot

                }
                wrapper.innerHTML = day + result_slot

                //set same name allow only one radio btn to be selected
                btn = ` <input type="radio" id="paper" name="btn" value="paper" onclick="filterSelection('paper')">
                <label for="paper">Paper</label>
                <input type="radio" id="other" name="btn" value="workshop" onclick="filterSelection('other')">
                <label for="workshop">other except paper</label>
                <input type="radio" id="all" name="btn" value="all" onclick="filterSelection()">
                <label for="all">all</label>`

            }
        }

    }
    wrapper.innerHTML += btn
}


function filterSelection(x) {
    //show paper only 
    console.log(x)

    let selecteds = document.getElementsByClassName("filterDiv")
    console.log(selecteds)
    if (x == "paper") {
        console.log('here')
        for (let i of selecteds) {
            if (i.className == "filterDiv paper") {
                //do sth 
                console.log('haha paper')
                i.style.display = "block"
            }
            else if (i.className !== "filterDiv paper") {
                i.style.display = "none"
            }
            // if (i.style.display !='none'){
            //     i.style.display = "none"
            //     console.log('heheheh im heere')
            // } 
            // else (i.style.display = "block")
        }
    }
    else if (x == "other") {
        for (let i of selecteds) {
            if (i.className == "filterDiv paper") {
                //do sth 
                console.log('haha paper')
                i.style.display = "none"
            }
            else if (i.className !== "filterDiv paper") {
                i.style.display = "block"
            }
            // if (i.style.display !='none'){
            //     i.style.display = "none"
            //     console.log('heheheh im heere')
            // } 
            // else (i.style.display = "block")
        }
    }
    else {
        for (let i of selecteds) {
            if (i.style.display == 'none') {
                i.style.display = "block"

            }
        }

    }

}

//read submission 


function readSubmission(subInput){
    // load input and function name to loadJson Func
    loadJson(readResult,subInput)

}

    
function readResult(res,subInput){

    let wrapper = document.querySelector("."+CSS.escape(subInput))
    console.log(wrapper)
        //     for (let i in wrapper){
        //     let btn  = wrapper[i]
        //     btn.addEventListener('click', readSubmission()
        // }
    let result = ''
    console.log(res)
    console.log(subInput)
    for (let i in res) {
        slots = res[i].slots
        slots = Object.values(slots)
        // console.log(slots)
        for (let slot of slots) {

            for (let session of slot.sessions) {
                if (session.sessionId == subInput){
                    console.log(session.submissions)
                    if (session.submissions == 0){
                        console.log('her eis undefined')
                        result += `<div><img src="./broken.png" alt="empty"/>Nothing to show. </div>`
                        wrapper.innerHTML = result
                    }
                    else{for (let i in session.submissions){
                        console.log(session.submissions[i].doiUrl)

                        session.submissions[i].title
                        result+= `<div> <img src="./submission.png" alt="submission"/>
                        <div class="sub-title"> ${session.submissions[i].title}</div>
                        <a href="${session.submissions[i].doiUrl}"  target="_blank">link</a></div>

                        `

                    }
                    // console.log(session.submissions[0].doiUrl)
                    wrapper.innerHTML = result
                }
                }
            }
        }
    }
}

