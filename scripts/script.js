const footerItem = document.querySelectorAll(".footer__item"),
      footerLists = document.querySelectorAll(".list"),
      footerBtns = document.querySelectorAll(".footer__btn"),
      calendar = document.querySelector(".calendar__main-lout"),
      nextMonthBtn = document.querySelector(".rightIcon"),
      prevMonthBtn = document.querySelector(".leftIcon"),
      selectYear = document.querySelector("#year"),
      monthsSlider = document.querySelector(".months"),
      monthsSliderItem = Array.from(monthsSlider.children),
      noteFilterSelect = document.querySelector("#action");

// ------   адаптивное меню footer  -------- 
footerItem.forEach((item, i) => {
    item.addEventListener("click", () => {
        footerLists[i].classList.toggle("list-openClose");
        footerBtns[i].classList.toggle("footer__btn-scale")
    })
})

/// ------   Календарь  -------- 
function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(month, year) {
    var firstDayOfMonth = new Date(year, month, 1);
    var firstDayOfWeek = firstDayOfMonth.getDay();
    return firstDayOfWeek;
}

function getLastDayOfWeek(month, year) {
    const date = new Date(year, month + 1, 0);
  
    const lastDayOfWeek = date.getDay();
  
    return lastDayOfWeek;
  }

function creatCalendar(year, month){
    const daysMonth = getDaysInMonth(month, year);
    const daysPrevMonth = getDaysInMonth(month - 1, year);
    const FirstDayOfWeek = getFirstDayOfWeek(month, year);
    const lastDayOfWeak = getLastDayOfWeek(month, year)

    
    let daysPrev = daysPrevMonth - FirstDayOfWeek + 2;

    //  дни предидущего месяца 
    for(let i = FirstDayOfWeek; i > 1; i --){
        const element = document.createElement("div");
        
        element.classList.add("item-calendar");
        element.classList.add("opacity02");
        element.append(`${daysPrev}`)
        calendar.append(element)
        daysPrev++;
    }

    //Заполняем дни текущего месяца
    for(let i = 1; i <= daysMonth; i ++){
        const element = document.createElement("div");
        element.classList.add("item-calendar");
        element.append(i);
        calendar.append(element);
        addNotes(2023, 5, 15, i, element, "Продажа медицинских издел", "note-veb");
        addNotes(2023, 5, 25, i, element, "От сантехника до хирурга", "note-prez");
        addNotes(2023, 5, 6, i, element, "Продажа медицинских издел", "note-veb");
        addNotes(2023, 5, 17, i, element, "От сантехника до хирурга", "note-prez");
        addNotes(2023, 6, 25, i, element, "От сантехника до хирурга", "note-prez")
        addNotes(2023, 6, 8, i, element, "Продажа медицинских издел", "note-veb");
    }

      //дни следующего месяца
      let j = 1
      for(let i = lastDayOfWeak; i < 7 ; i ++){
        const element = document.createElement("div");
        element.classList.add("item-calendar");
        element.classList.add("opacity02");
        element.append(j);
        calendar.append(element);
        j++;
    }  

    function addNotes(noteYear, noteMonth ,noteData, day, element, textNote, typeNode){
        if(noteYear == year && noteMonth == month && noteData == day){
            const noteElem = document.createElement("div");
            noteElem.classList.add(typeNode)
            noteElem.append(textNote);
            element.append(noteElem);
        }
    }
}

    function filterNotes(){
        noteFilterSelect.addEventListener("change", (e) => {
            clearCalendar();
            creatCalendar(year, month);
            const filterCriteria = e.target.value;

            console.log(filterCriteria)
            const noteNeedDelite = document.querySelectorAll(`.${filterCriteria}`);

            console.log(noteNeedDelite)
            
            noteNeedDelite.forEach(item => item.remove())

            if(filterCriteria == "all"){
                clearCalendar();
                creatCalendar(year, month);
            }

        })
    }

function clearCalendar(){
    const calendatItem =  document.querySelectorAll(".item-calendar");
    calendatItem.forEach(item => item.remove())
}
let year = 2023;
let month = 5; 

creatCalendar(year, month);

// ------- Переключение года ----------
selectYear.addEventListener("change", (e) =>{
    const year = e.target.value;

    clearCalendar();
    creatCalendar(year, month);
})

// ------- Слайдер месяцев --------
nextMonthBtn.addEventListener("click", (e) => {
    month = (month < 12) ? month + 1 : month;
    clearCalendar();
    creatCalendar(year, month);
    sliderMonth(month)
})
prevMonthBtn.addEventListener("click", (e) => {
    month = (month != 0) ? month - 1 : month;
    clearCalendar();
    creatCalendar(year, month);
    sliderMonth(month)
})



function sliderMonth(slide){
    monthsSliderItem.forEach(item =>{
        item.classList.add("dn")
        item.classList.remove("opacity04");
        item.classList.remove("opacity01");
        item.classList.remove("db")
    });

    monthsSliderItem[slide].classList.add("db");
    monthsSliderItem[slide].classList.remove("dn");
    monthsSliderItem[(slide) ? slide - 1 : null]?.classList.add("opacity04");
    monthsSliderItem[(slide) ? slide - 2 : null]?.classList.add("opacity01");
    monthsSliderItem[(slide != 10) ? slide + 1 : null]?.classList.add("opacity04");
    monthsSliderItem[(slide != 11) ? slide + 2 : null]?.classList.add("opacity01");
}


sliderMonth(5);
filterNotes();


