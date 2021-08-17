// age
// relationship
// smoker

var householdList = [];

var buttons = document.getElementsByTagName("button");
var addButton = document.getElementsByClassName("add")[0];
var submitButton = buttons.item(1);
var ageField = document.getElementById("age");
var relationship = document.getElementById("rel");
var smoker = document.getElementsByName("smoker")[0];
var list = document.getElementsByTagName("ol")[0];
var errorMessages = [];
var errors = null;


function start() {
    householdList = [];
    addButton.setAttribute("type","button");
    addButton.addEventListener("click", tryAdd);
    submitButton.setAttribute("type",'');
    errors = document.createElement('div');
    document.forms[0].append(errors);
    addStyles();
    initializeForm();
}

function addStyles() {
    errors.style.color = 'red';
    document.body.style.fontFamily = "arial";
    document.body.style.lineHeight = '1.8';
    var labels = document.getElementsByTagName('label');
    for (var i=0; i<labels.length; i++) {
        labels[i].style.position = "relative";
    }
    var inputs = document.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++) {
        inputs[i].style.position = "absolute";
        inputs[i].style.left = "120px";
    }

    var sel = document.getElementsByTagName('select');
    for (var i=0; i<sel.length; i++) {
        sel[i].style.position = "absolute";
        sel[i].style.left = "120px";
    }

}

function initializeForm() {
    errorMessages = [];
    relationship.options[0].label = "--------";
    relationship.options[5].label = "Grandparent";
    relationship.options.selectedIndex = 0;
    ageField.value = '';
    smoker.checked = false;
}

function tryAdd() {
    var age = Number(ageField.value);
    if (Number.isNaN(age) || age <=0 ) {
        errorMessages.push("Wrong age value");
    }
    var selected = relationship.options.selectedIndex;
    var rel = relationship.options[selected].label;
    if (relationship.selectedIndex === 0) {
        errorMessages.push("Missing relationship");
    }
    errors.innerHTML = '';
    for (var i=0; i<errorMessages.length; i++) {
        errors.innerHTML += errorMessages[i] + '<br/>';
    }
    if (errorMessages.length === 0) {
        householdList.push({
            relationship: rel,
            age: age,
            smoker: smoker.checked
        })
    }
    updateList();
    initializeForm();
}

function listDiv(text, width) {
    var div = document.createElement('div');
    div.innerText = text;
    div.style.display = "inline-block";
    if (width) {
        div.style.width = '' + width + 'px';
    }
    return div;
}

function deleteFromList(event) {
    var ix = Number(event.target.id);
    console.log('before', ix,  householdList);
    householdList.splice(ix, 1);
    console.log('after', ix,  householdList);
    updateList();
}

function updateList() {
    list.innerHTML = '';
    for (var i=0; i<householdList.length; i++) {
        var li = document.createElement('li');
        li.appendChild(listDiv(householdList[i].relationship, 120));
        li.appendChild(listDiv('' + householdList[i].age + ' years',80));
        li.appendChild(listDiv(householdList[i].smoker? 'smoker' : '', 80));
        var deleteControl = listDiv('Delete');
        deleteControl.setAttribute("id",'' + i);
        deleteControl.style.color = '#0000bb';
        deleteControl.style.cursor = 'pointer';

        deleteControl.onclick = deleteFromList;
        li.appendChild(deleteControl);
        list.appendChild(li);
    }
}

start();

