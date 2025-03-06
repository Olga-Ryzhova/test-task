document.addEventListener('DOMContentLoaded', () => {
// таймер отсчета
const deadline = '00:10:00';

// Функция для преобразования времени в объект Date
function getDeadlineDate(timeStr) {
  const now = new Date();
  const [hours, minutes, seconds] = timeStr.split(':');
  now.setMinutes(now.getMinutes() + parseInt(minutes)); 

  return now;
}

//перевод мс в разницу в дате и времени
function getTimeRemaining(endtime) {   
  const t = Date.parse(endtime) - Date.parse(new Date());
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const second = Math.floor((t / 1000) % 60);

  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'second': second
  }
}

//подставляем нули, если одно число 
function getZero(num) { 				 
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

//устанавливаем таймер на странице
function setClock(selector, endtime) {    
  const timer = document.querySelector(selector),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

  updateClock();  //сразу запускаем функцию, чтобы сразу был актуальный таймер

  function updateClock() {  //обновляем таймер каждую секунду
    const t = getTimeRemaining(endtime);

    hours.innerHTML =  getZero(t.hours);
    minutes.innerHTML =  getZero(t.minutes);
    seconds.innerHTML =  getZero(t.second);

    if (t.total <= 0) {   //завершаем наш таймер
      clearInterval(timeInterval);
      hours.innerHTML =  '00';
      minutes.innerHTML =  '00';
      seconds.innerHTML =  '00';

      // Перезапускаем таймер с исходным значением через 1 секунду
      setTimeout(() => {
        setClock(selector, getDeadlineDate(deadline));
      }, 1000);
    }
  }
}

setClock('.purchase_discount__timer', getDeadlineDate(deadline)); 


// покупка
const purchaseCredit = document.querySelector('.purchase_credit');
const creditItems = purchaseCredit.querySelectorAll('.purchase_credit_item');

function updateLayout() {
  // Ширина контейнера
  const containerWidth = purchaseCredit.offsetWidth;
  // Ширина первого элемента
  const itemWidth = creditItems[0].offsetWidth;

  
  // Количество элементов, которые можно поместить в один ряд
  const itemsPerRow = Math.floor(containerWidth / itemWidth);
  // Сначала устанавливаем ширину для первой строки 
  const firstRowItems = 5;

  // После первой строки, устанавливаем ширину для остальных элементов
  let remainingItems = creditItems.length - firstRowItems;
  let startIdx = firstRowItems;

  // Объект для ширины в зависимости от количества элементов в строке
  const widths = {
    1: '100%',
    2: '48%',
    3: '31%',
    4: '22.3%',
  };

  const defaultWidth = '150px';

  if (creditItems[5] && remainingItems === 1) {
    creditItems[5].style.cssText = `
      min-height: 74px;
      border: 2px solid rgb(170, 100, 100);
      background: rgba(170, 100, 100, 0.2);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 25px;
    `;
  } 

  // Изменяем ширину оставшихся элементов в зависимости от их количества на каждой строке
  while (remainingItems > 0) {
    const currentRowItems = Math.min(remainingItems, itemsPerRow);
    const width = widths[currentRowItems] || defaultWidth;

    for (let i = 0; i < currentRowItems; i++) {
      if (creditItems[startIdx + i]) {
        creditItems[startIdx + i].style.width = width;
      }
    }
    startIdx += currentRowItems;
    remainingItems -= currentRowItems;
  }
}

updateLayout();


// hover при покупке
const wrapper = document.querySelectorAll('.purchase_credit_item');
const prices = document.querySelectorAll('.purchase_credit_item__price');
const btns = document.querySelectorAll('.purchase_credit_item__buy');
const offers = document.querySelectorAll('.purchase_credit_item__offer');
const circles = document.querySelectorAll('.circle');


btns.forEach((btn, index) => {
  const item = wrapper[index];  
  const price = prices[index];  
  const circle = circles[index]; 
  const offer = offers[index]; 

  // При наведении на кнопку
  btn.addEventListener('mouseover', () => {
    item.style.backgroundColor = '#9564AA';  
    price.style.color = '#FFFFFF';  
    circle.style.color = 'black';
    offer.style.cssText =
    ` display: block;
      position: absolute;
      top: -13px;
      width: 123px;
      height: 23px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      border: none;
      padding: 0 4px;
      color: rgb(0, 0, 0);
      background: rgb(255, 207, 45);
    `
  });

  // При уходе мыши с кнопки
  btn.addEventListener('mouseout', () => {
    item.style.backgroundColor = '';  
    price.style.color = '';  
    offer.style.display = 'none'
  });
});

// Гамбургер
const menu = document.querySelector('.header_menu'),
    menuItem = document.querySelectorAll('.header_menu__link_item'),
    hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header_menu_active');
    });
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header_menu_active');
        })
    })
})

