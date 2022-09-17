const dateToday = document.getElementById("currentDay");
const nineText = document.getElementById("9textarea");
const tenText = document.getElementById("10textarea");
const elevenText = document.getElementById("11textarea");
const twelveText = document.getElementById("12textarea");
const oneText = document.getElementById("1textarea");
const twoText = document.getElementById("2textarea");
const threeText = document.getElementById("3textarea");
const fourText = document.getElementById("4textarea");
const fiveText = document.getElementById("5textarea");
const saveBtn9 = document.getElementById("9btn");
const saveBtn10 = document.getElementById("10btn");
const saveBtn11 = document.getElementById("11btn");
const saveBtn12 = document.getElementById("12btn");
const saveBtn1 = document.getElementById("1btn");
const saveBtn2 = document.getElementById("2btn");
const saveBtn3 = document.getElementById("3btn");
const saveBtn4 = document.getElementById("4btn");
const saveBtn5 = document.getElementById("5btn");
   
var DateTime = luxon.DateTime;

   
let currentTimeObject = DateTime.now().toObject();
   
let timeblockTime = [nineText.dataset.timeblockhour, tenText.dataset.timeblockhour, elevenText.dataset.timeblockhour, twelveText.dataset.timeblockhour, oneText.dataset.timeblockhour, twoText.dataset.timeblockhour, threeText.dataset.timeblockhour, fourText.dataset.timeblockhour, fiveText.dataset.timeblockhour];
    
let saveBtnArray = [saveBtn9, saveBtn10, saveBtn11, saveBtn12, saveBtn1, saveBtn2, saveBtn3, saveBtn4, saveBtn5];



    
dateToday.innerText = DateTime.now().toFormat('MMM dd, yyyy');



    
function checkDateTimeVSTimeblock(hour, i) {
    if (hour > i) {
        var tbElemGreat = document.querySelector(`[data-timeblockhour="${i}"]`);
        tbElemGreat.classList.add("past");
        tbElemGreat.classList.remove("present");
        tbElemGreat.classList.remove("future");
    } else if (hour == i) {
        var tbElemEqual = document.querySelector(`[data-timeblockhour="${i}"]`);
        tbElemEqual.classList.add("present");
        tbElemEqual.classList.remove("past");
        tbElemEqual.classList.remove("future");
    } else {
        var tbElemLess = document.querySelector(`[data-timeblockhour="${i}"]`);
        tbElemLess.classList.add("future");
        tbElemLess.classList.remove("past");
        tbElemLess.classList.remove("present");
    }
};
function addEventListenerOnBtns(tableBtn) {
    tableBtn.addEventListener('click', () => {
        localStorage.setItem(`TextFor: ${tableBtn.id}`, `${tableBtn.parentElement.previousElementSibling.children[0].value}`);
    });
};
function getLocalStorage(timeBtn) {
    let storage = Object.entries(localStorage);
    storage.forEach((keyposition) => {
        let keyChecker = `TextFor: ${timeBtn.id}`;
        let saveBtnTextarea = timeBtn.parentElement.previousElementSibling.children[0];
        console.log(keyposition);
        if (keyposition[0] === keyChecker) {
            console.log("gotcha");
            saveBtnTextarea.innerText = `${keyposition[1]}`;
            console.log(keyposition[1]);
        }
    });
};


    
timeblockTime.forEach((position) => checkDateTimeVSTimeblock(currentTimeObject.hour, position));

let intervalID = setInterval(() => {
    currentTimeObject = DateTime.now().toObject();
    timeblockTime.forEach((position) => checkDateTimeVSTimeblock(currentTimeObject.hour, position));
}, 1000);

saveBtnArray.forEach((timeRow) => {
    getLocalStorage(timeRow)
    addEventListenerOnBtns(timeRow)
});