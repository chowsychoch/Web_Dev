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
    let shown = `<select id="date" name="date" onchange="showFunc();clearTimeslot()">
    <option value="">Select a Date</option>`;
    let day = ""
    //choose the timeslot after clicking a specific date 
    let timeSlot = ""
    // read date 
    for (let i in res) {
        shown += `
        <option value="${res[i].date}"> ${res[i].date} ${res[i].day}</option> 
        `
        // access 0 index of slots e.g. {"ba449917":{"slotId"}:"ba449917"}}
        slots = res[i].slots
        slot = Object.values(slots)
        timeSlot += `<select id="${res[i].day}" class="date" name="${res[i].day}"><option value="">time slot(optional)</option>`
        for (let key of slot) {
            timeSlot += `<option key="${res[i].day}" value="${key.time}">${key.time}</option>`
        }
        timeSlot += `</select>`
    }
    document.getElementById("schedule-picker").innerHTML = shown + `</select>` + timeSlot + `
    
    <input class="btn" type="submit" value="Submit"/>` + day

}

//Click to show the timeslot of that date 

function showFunc() {
    let dateArr = ["2020-04-25","2020-04-26","2020-04-27","2020-04-28","2020-04-29","2020-04-30"]
    let id = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    let dateChose = document.getElementById("date").value;
    for (let date in dateArr){
        if (dateChose == dateArr[date]){
            document.getElementById(id[date]).style.display = "block";
        }else{
            document.getElementById(id[date]).style.display = "none"
        }
    } 
    
}
//clear previous chosen timeslot
function clearTimeslot() {
    console.log('clear now')
    let classvalid = document.getElementsByClassName('date')
    for (let i = 0; i < classvalid.length; i++) {
        if (classvalid[i].value != "") {
            document.getElementsByClassName("date")[i].selectedIndex = 0;
        }
    }
}

const formElem = document.querySelector('form');
formElem.addEventListener('submit', (e) => {
    // on form submission, prevent default
    e.preventDefault();
    // construct a FormData object, which fires the formdata event
    new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
    // Get the form data from the event object
    let data = e.formData;
    let arr = []
    for (let value of data.values()) {
        if (value != "") {
            arr.push(value)
        }
    }
    if (arr.length == 0) {
        alert("Please select a day.")
    }
    loadJson(readUserResult, arr)
});

function readUserResult(res, arr) {

    let wrapper = document.getElementById("UserResult")
    let day = ""
    let slots = ""
    let result_slot = ""
    let btn = ""
    for (let i in res) {
        if (arr[0] == res[i].date) {
            let userDate = res[i].date
            // day selected 
            day += `<div class="day">${res[i].date} ${res[i].day}</div>`

            //get the date and return to specific result 
            slots = res[i].slots
            slots = Object.values(slots)
            //set same name allow only one radio btn to be selected
            btn = ` <input type="radio" id="paper" name="btn" value="paper" onclick="filterSelection('paper')">
                            <label for="paper">Paper</label>
                            <input type="radio" id="other" name="btn" value="workshop" onclick="filterSelection('other')">
                            <label for="workshop">other except paper</label>
                            <input type="radio" id="all" name="btn" value="all" onclick="filterSelection()">
                            <label for="all">all</label>`

            for (let slot of slots) {
                if (slot.time == arr[1] || arr.length == 1) {
                    for (let session of slot.sessions) {
                        //print out sessions 
                        // title, time, location, room type 
                        result_slot += `<div class="filterDiv ${session.type}"> 
                        <div class="session-title">${session.title}</div>
                        <button class="session-btn" name="${session.sessionId}" onclick="readSubmission('${session.sessionId}')">More info</button>
                        <div class="${session.sessionId} sessionId"></div>
                        <div class="room"><img src="./venue.png" alt="room" />${session.room}</div>
                        <div class="time"><img src="./time.png" alt="time" />${session.time}</div>
                        <div class="type"><img src="./info.png" alt="info" />${session.type}</div>
                        </div>
                        `
                    }

                }
                wrapper.innerHTML =day + btn + result_slot
            }
        }
    }
}

function filterSelection(x) {
    //show paper only 
    let selecteds = document.getElementsByClassName("filterDiv")
    if (x == "paper") {
        for (let i of selecteds) {
            if (i.className == "filterDiv paper") {
                //do sth 
                i.style.display = "block"
            }
            else if (i.className !== "filterDiv paper") {
                i.style.display = "none"
            }
        }
    }
    else if (x == "other") {
        for (let i of selecteds) {
            if (i.className == "filterDiv paper") {
                //do sth 
                i.style.display = "none"
            }
            else if (i.className !== "filterDiv paper") {
                i.style.display = "block"
            }
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
function readSubmission(subInput) {
    // load input and function name to loadJson Func
    loadJson(readResult, subInput)

}

function readResult(res, subInput) {
    console.log(subInput)
    let wrapper = document.querySelector("." + CSS.escape(subInput))
    let result = ''
    for (let i in res) {

        slots = res[i].slots
        slots = Object.values(slots)
        for (let slot of slots) {

            for (let session of slot.sessions) {
                if (session.sessionId == subInput) {
                    if (session.submissions == 0) {
                        result += `<div><img src="./broken.png" alt="empty"/>Nothing to show. </div>`
                        wrapper.innerHTML = result
                    }
                    else {
                        for (let i in session.submissions) {
                            session.submissions[i].title
                            result += `<div> <img src="./submission.png" alt="submission"/>
                        <div class="sub-title"> ${session.submissions[i].title}</div>
                        <a href="${session.submissions[i].doiUrl}"  target="_blank">link</a></div>

                        `
                        }
                        wrapper.innerHTML = result
                    }
                }
            }
        }
    }
}
