// open / close menu

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.boxShadow = "0px 0px 20px 1px var(--four-background-color)";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.boxShadow = "none";
}

// menu navigator

$(document).ready(function () {
  $(".menuBtn").on("click", function () {
    $(".tabs").css("display", "none");    
    $("#" + $(this).attr("tab")).css("display", "block");
    closeNav();
  });
});


$(document).ready(function () {
  $(".search-phone-input").focus();
});

// search phones

$(document).ready(function () {
  $("#phoneSearchInput").on("keyup", function () {  
    if ($(this).val().toString().length > 0 ) {
      phoneFilter($(this).value);      
    }  
    else {
      document.getElementById("phonebookTable").innerHTML =  '';      
    }    
  });
});  

function phoneFilter(name) { 

  let result = phonebookArray.filter(search);

  if (result.length > -1) {
      let finalResult = '';

      for (let index = 0; index < result.length; index++) {
      let card = `
      <div class="card">
      <div>
      <p class="name">` + result[index].name  + `</p>` + 
      splitPhoneNumbers(result[index].tel) + 
      `</div>
      </div>`;
      
      finalResult += card;
      }

      document.getElementById("phonebookTable").innerHTML = finalResult;
  }                        
}

function search(item) {
  if (item.name.toString().indexOf(document.querySelector("#phoneSearchInput").value) == 0) {
      return true;
  }
  else {
      return false;
  }
}    

// two phone numbers splitter

function splitPhoneNumbers(phoneNumber) {
  if (!phoneNumber.includes(",")) {
    return `<p class="tel"><a href="tel:` + phoneNumber + `" ontouchstart="longPressStart('` + phoneNumber + `')" ontouchend="longPressEnd()">` + phoneNumber + `</a></p>`;
  }

  let tempArr = phoneNumber.split(",");
  let phoneNumbersElement = "";

  for (let index = 0; index < tempArr.length; index++) {
    phoneNumbersElement += `<p class="tel"><a href="tel:` + tempArr[index] + `" ontouchstart="longPressStart('` + tempArr[index] + `')" ontouchend="longPressEnd()">` + tempArr[index] + `</a></p>`;
  }
  return phoneNumbersElement;
}

// long press on event - copy the number 

function longPressStart(phoneNumber) {
  pressTimer = window.setTimeout(function() { copy(phoneNumber); }, 850);
  return false; 
} 

function longPressEnd() {
  clearTimeout(pressTimer);
  // Clear timeout
  return false;
} 

// copy

function copy(textToCopy) {
  
  let input = document.createElement('input');
  input.setAttribute('value', textToCopy);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  
  return  $(".alert").fadeIn(200).delay(800).fadeOut(200);
}

// alert
function openAlert(text) {
  document.querySelector(".alert-board").innerHTML = text;  
  $(".alert-bg").fadeIn(100);
  document.querySelector(".alert-board").scrollTop = 0;
}

function closeAlert() {  
  $(".alert-bg").fadeOut(300, function() {    
    document.querySelector(".alert-board").innerHTML = '';    
  });
}

// alert usage - phonebook info button
$("#phonesInfoBtn").on("click", function() {
  let temp = "לחצו על המספר כדי <b>להתקשר</b>. <br> בכדי <b>להעתיק</b> - לחצו לחיצה ארוכה.";
  temp += "<br><br>";
  temp += "אם ברצונכם להוסיף או לעדכן מספר - פנו אלינו בצור קשר." 
  openAlert(temp);
}); 

// alert usage - phonebook info button
$(".shul-info").on("click", function() {
  openAlert("<b>שימו לב!</b>" +  "<br> יתכן וזמני התפילות ישתנו לאחר הפרסום");
}); 




// business index search
$(document).ready(function () {
  $("#businessSearchInput").on("keyup", function () {  
    if ($(this).val().toString().length > 0 ) {
      createBusinessCards($(this).value);      
    }  
    else {
      document.getElementById("businessTable").innerHTML =  '';      
    }    
  });
});  

// build business card
function createBusinessCards(nameOrTag) {

  let filteredCardsArr = businessArray.list.filter(searchInObjectsArrByNameAndTags); 
  
  if (filteredCardsArr.length > -1) {
    let finalResult = '';

    for (let index = 0; index < filteredCardsArr.length; index++) {
    let card = `
    <div class="card business-card-border" onclick='openBusinessPopup(` + JSON.stringify(filteredCardsArr[index]) + `)'>
    <div>
    <p class="name">` + filteredCardsArr[index].name  + `</p>` + 
    `<p class="sec-or-address">` + (filteredCardsArr[index].hasOwnProperty('des') ? filteredCardsArr[index].des : filteredCardsArr[index].address) + `</p>` +
    `</div>
    </div>`;
    
    finalResult += card;
    }
    document.getElementById("businessTable").innerHTML = finalResult;
  }  

}
                      

function searchInObjectsArrByNameAndTags(item) {
  if (item.name.toString().indexOf(document.querySelector("#businessSearchInput").value) > -1 || item.tags.toString().indexOf(document.querySelector("#businessSearchInput").value) > -1) {
    return true;
  }
  return false;
} 


// open buisness and gmach card detailes with popup - onClick
function openBusinessPopup(businessObject) {
  let openedCard = `
  <h2>` + businessObject.name + `</h2> 
  <p class="notice-sec-or-address">` +  businessObject.des + `</p>
  <table class="popup-table">` +
  `<tr>` +
  `<td>איש קשר</td>` +
  `<td>` + businessObject.owner + `</td>` +
  `</tr>` +
  `<tr>` +
  `<td>טלפון</td>` +
  `<td>` +
  splitPhoneNumbers(businessObject.tel).replace('tel','tel-for-business-card') + 
  `</td>` + 
  //`<td><a href="tel:` + businessObject.tel + `" ontouchstart="longPressStart('` + businessObject.tel + `')" ontouchend="longPressEnd()">` + businessObject.tel + `</a></td>` +
  `</tr>` +
  `<tr>` +
  `<td>אימייל</td>` +
  `<td>` + (businessObject.email == '--' ? '--' : `<a href="mailto:` + businessObject.email + `" ontouchstart="longPressStart('` + businessObject.email + `')" ontouchend="longPressEnd()">` + businessObject.email + `</a>`) + `</td>` +
  `</tr>` +
  `<tr>` +
  `<td>כתובת</td>` +
  `<td>` + (businessObject.address == '--' ? '--' : businessObject.address) + `</td>` +
  `</tr>` +
  `</table>`; 

  openAlert(openedCard); 
}

// 
// gmachim index search
$(document).ready(function () {
  $("#gmachimSearchInput").on("keyup", function () {  
    if ($(this).val().toString().length > 0 ) {
      createGmachimCards($(this).value);      
    }  
    else {
      document.getElementById("gmachimTable").innerHTML =  '';      
    }    
  });
});  

// build gmachim card
function createGmachimCards(nameOrTag) {

  let filteredCardsArr = gmachim.list.filter(searchInGmachimObjectsArrByNameAndTags); 
  
  if (filteredCardsArr.length > -1) {
    let finalResult = '';

    for (let index = 0; index < filteredCardsArr.length; index++) {
    let card = `
    <div class="card business-card-border" onclick='openBusinessPopup(` + JSON.stringify(filteredCardsArr[index]) + `)'>
    <div>
    <p class="name">` + filteredCardsArr[index].name  + `</p>` + 
    `<p class="sec-or-address">` + (filteredCardsArr[index].hasOwnProperty('des') ? filteredCardsArr[index].des : filteredCardsArr[index].address) + `</p>` +
    `</div>
    </div>`;
    
    finalResult += card;
    }
    document.getElementById("gmachimTable").innerHTML = finalResult;
  }  

}
                      
// search by name and tag
function searchInGmachimObjectsArrByNameAndTags(item) {
  if (item.name.toString().indexOf(document.querySelector("#gmachimSearchInput").value) > -1 || item.tags.toString().indexOf(document.querySelector("#gmachimSearchInput").value) > -1) {
    return true;
  }
  return false;
} 


// build a shul time and detailes table popup
function buildShulPopup(shul) {
  // build tfilot in rows
  let tfolotTable = '';
  shul.tfilot.forEach(item => {
    tfolotTable += `
    <tr>` +
    `<td>` + item.name + `</td>` +
    `<td>` + item.value.replaceAll(',','<br>') + `</td>` +
    `</tr>`;
  });

  let openedShul = `
  <h2>` + shul.name + `</h2> 
  <p class="notice-sec-or-address">` +  shul.address + `</p>
  <p class="notice-sec-or-address"><b>נוסח:</b> ` + shul.nuscah + `</p>
  <h3>זמני תפילות לימות החול:</h3> 
  <table class="popup-table">` +
  tfolotTable + 
  `</table>` +
  `<h3>צור קשר:</h3>` + 
  `<table class="popup-table">` +
  `<tr>` +
  `<td>טלפון</td>` +
  `<td><a href="tel:` + shul.tel + `" ontouchstart="longPressStart('` + shul.tel + `')" ontouchend="longPressEnd()">` + shul.tel + `</a></td>` +
  `</tr>` +
  `<tr>` +
  `<td>אימייל</td>` +
  `<td><a href="mailto:` + shul.email + `" ontouchstart="longPressStart('` + shul.email + `')" ontouchend="longPressEnd()">` + shul.email + `</a></td>` +
  `</tr>` +
  `</table>`;

  openAlert(openedShul);
}

function buildSulsCards() {
  let finalResult = '';
  for (let index = 0; index < shuls.list.length; index++) {
    let card = `
    <div class="card business-card-border" onclick='buildShulPopup(` + JSON.stringify(shuls.list[index]) + `)'>
    <div>
    <p class="name">` + shuls.list[index].name  + `</p>` + 
    `<p class="sec-or-address">` + shuls.list[index].address + `</p>` +
    `</div>
    </div>`;    
    finalResult += card;
  }
    document.getElementById("shulsTable").innerHTML = finalResult;
}

buildSulsCards();