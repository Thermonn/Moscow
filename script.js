//// Main page ////

$(document).ready(function() {
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 1) {
      $('.down-arrow').addClass('fade');
    } else{
      $('.down-arrow').removeClass('fade');
    }
  })
});

///// Map /////

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcm1vbiIsImEiOiJja3k3ODlka2cwenRxMnZxY3kxd21kMzUxIn0.ZmjbPpuvTNPCnUazKleUvw';

var map = new mapboxgl.Map({
    container: 'map',  
    style: 'mapbox://styles/thermon/ckyszpiyw2s3w14lhb6h3tjfr',
    center: [37.618423, 55.751244],
    cooperativeGestures: true,
    zoom: 9,
    minZoom: 6.5,
    maxZoom: 20,
    maxBounds: [[29.400100, 53.219191], [45.769520, 58.211138]]
});

map.on('load', () => {
  map.dragRotate.disable();
  map.keyboard.disableRotation();
  const navControls = new mapboxgl.NavigationControl({
    showCompass: false
  });
  map.addControl(navControls, 'bottom-right');
});

/* All the points that open a popup.
 * Not necessarily same category!  */
const moscowPopups = {
    "features": [
        {
          "type": "Feature",
          "properties": {
            "title": "«Прощание славянки»",
            "image": "https://upload.wikimedia.org/wikipedia/ru/thumb/f/ff/Памятник_«Прощание_славянки»_5.jpeg/468px-Памятник_«Прощание_славянки»_5.jpeg",
            "description": "Памятник в честь марша «Прощание славянки»",
            "link": "https://ru.wikipedia.org/wiki/Прощание_славянки_(памятник)",
            "hover": "Адрес: площадь Тверская Застава, 7, стр. 1"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [37.58125906545352, 55.776515670545436]
          },
          "id": "SlavGoodbye"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Музей истории танка Т-34",
            "image": "https://kudamoscow.ru/uploads/3ac45d6010ac2e4a74ace0d5d635d1c5.png",
            "description": "Музейно-мемориальный комплекс расположен на 36-м километре Дмитровского шоссе – историческом танковом месте.",
            "link": "http://museum-t-34.ru",
            "hover": "Адрес: Дмитровское ш., д. 89А дер, Шолохово, Московская обл.\nЧасы работы: 10:00–18:00"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [37.52959728240967, 56.055051902459155]
          },
          "id": "T34Museum"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Музей обороны Москвы",
            "image": "https://upload.wikimedia.org/wikipedia/commons/5/55/Музей_обороны_2.jpg",
            "description": "Государственный музей обороны Москвы — музей, посвящённый Московской битве, а также памяти защитников столицы.",
            "link": "http://gmom.ru",
            "hover": "Адрес: Мичуринский проспект, Олимпийская деревня, 3\nЧасы работы: 10:00–18:00"
        },
          "geometry": {
            "type": "Point",
            "coordinates": [37.467273473739624, 55.676341230265706]
          },
          "id": "OboronyMuseum"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Центральный музей Вооруженных сил РФ",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Moscow_Armed_Forces_Museum.jpg/548px-Moscow_Armed_Forces_Museum.jpg",
            "description": "Военно-исторический музей на улице Советской Армии. В его фондах и экспозиции насчитывается около 800 тысяч единиц хранения.",
            "link": "http://cmaf.ru",
            "hover": "Адрес: ул. Советской Армии, д. 2, стр. 1\nЧасы работы: 10:00–17:00"
        },
          "geometry": {
            "type": "Point",
            "coordinates": [37.617085576057434, 55.7848841438147]
          },
          "id": "ArmedForcesMuseum"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Центральный музей Военно-воздушных сил",
            "image": "https://vsemuzei.com/wp-content/uploads/2020/01/monino.jpeg",
            "description": "Один из крупнейших музеев авиации в Европе, сохраняющий историю создания и развития военной авиации в России.",
            "link": "https://cmvvs.ru",
            "hover": "Адрес: Московская область, г.о. Щёлково, р.п. Монино, ул. Музейная, д.1\nЧасы работы: 09:00–18:00"
        },
          "geometry": {
            "type": "Point",
            "coordinates": [38.18302631378174, 55.83290911147952]
          },
          "id": "AirForceMuseum"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Федеральное военное мемориальное кладбище",
            "image": "https://pp.userapi.com/c638617/v638617449/3c777/LKX3bZbwCbQ.jpg",
            "description": "Кладбище предназначено для захоронения погибших защитников Отечества, выдающихся деятелей науки, культуры и других областей.",
            "link": "https://вмкс.рф/fvmk/",
            "hover": "Адрес: Осташковского ш. 4-й км вл. 2, Борисовка, Московская обл.\nВход с 10:00 до 18:00 по предъявлению паспорта"
        },
          "geometry": {
            "type": "Point",
            "coordinates": [37.67514467239379, 55.92702627157517]
          },
          "id": "FederalCemetery"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Обелиск «Москва — город герой»",
            "image": "http://img.29palms.ru/photo/hotels/russia/moscow/moscow-hero-city/resized/003_Rossiya_Obelisk_Gorod-geroy_Moskva_Moscow_Hero_City_Monument_on_Ploschad_Dorogomilovskaya-Zastava_Dorogomilovskaya_Outpost_SquareFoto_fortsite-Deposit.jpg",
            "description": "Московский монумент, открытый 9 мая 1977 года в память об обороне города в 1941-м году.",
            "link": "https://ru.wikipedia.org/wiki/Городу-Герою_Москве",
            "hover": "Адрес: площадь Дорогомиловская Застава, на пересечении Кутузовского проспекта и Большой Дорогомиловской улицы"
        },
          "geometry": {
            "type": "Point",
            "coordinates": [37.555483281612396, 55.746774159975324]
          },
          "id": "MoscowHero"
        }
    ],
    "type": "FeatureCollection"
};

/* All the points that open a sidebar.
 * Not necessarily same category!  */
const moscowSidebars = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Манежная пл., перед Историческим музеем."
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.61683344841, 55.7558372575]
        },
        "id": "Zhukov"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Москва, Площадь Победы, д. 3\nЧасы работы: с 10:00 до 20:00"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.50451326370, 55.73068665750]
        },
        "id": "VictoryMuseum"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Парк Победы, Поклонная гора\n7 минут пешком от метро Парк Победы"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.50701235366821, 55.731698550554896]
        },
        "id": "VictoryMonument"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Александровский Сад, у стен Кремля\n5 минут пешком от метро Охотный ряд или Александровский сад"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.61616826057434, 55.754817688690295]
        },
        "id": "UnknownSoldier"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Московская обл., Минское ш., 55 км\nЧасы работы: с 10:00 до 19:00"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [36.821558475494385, 55.57908456883291]
        },
        "id": "MemoryLaneMuseum"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Москва, ул. Советская, д.80, строение 1\nЧасы работы: с 10:00 до 18:00"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.75160908699035, 55.79734901574534]
        },
        "id": "StalinsBunker"
      },
      {
        "type": "Feature",
        "properties": {
          "hover": "Адрес: Москва, Измайловский парк, аллея Большого Круга"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [37.75309771299362, 55.772339847900234]
        },
        "id": "ComplexMuzhestva"
      }
    ]
};


const sidebars = document.querySelectorAll(".sidenav")


for (const feature of moscowPopups.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.classList.add('marker');
  el.setAttribute("title", `${feature.properties.hover}`)  // <- HOVER THING
   
  el.addEventListener("click", function() {
    for (let sbar of sidebars) {
      sbar.style.left = "-450px";  // close all sidebars
    }
    
    map.easeTo({  // Fly to clicked marker 
      center: feature.geometry.coordinates, 
      zoom: (map.getZoom() < 11)? 11: map.getZoom()
    });
  }); 
  
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
    new mapboxgl.Popup({ offset: 20 }) // add popups
      .setHTML(
        `<a href="${feature.properties.link}" class="popup-link" target="_blank"><h3 class="popup-heading">${feature.properties.title}</h3></a>
        <img src="${feature.properties.image}" class="popup-img"></img>
        <p class="popup-text">${feature.properties.description}</p>`
      )
    )
    .addTo(map);
}

for (const feature of moscowSidebars.features) {
    const parent = document.getElementById(`${feature.id}`);  // ! the sidebar. This is why html id must be the same as geojson id.
    const el = document.createElement('div');
    el.classList.add('marker');
    el.setAttribute("title", `${feature.properties.hover}`)  // <- HOVER THING

    el.addEventListener("click", function() {
        for (let sbar of sidebars) {
          sbar.style.left = "-450px";  // close all sidebars
        }
        parent.style.left = "0";  // open specific sidebar
        
        map.easeTo({  // Fly to clicked marker 
          center: feature.geometry.coordinates, 
          zoom: (map.getZoom() < 11)? 11: map.getZoom()  // if (current zoom < 11) set newZoom to 11, else keep old zoom
        });
    }); 
    
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      
      .addTo(map);
}


// XBtn close function
const closeBtns = document.querySelectorAll(".closebtn");
for (const XBtn of closeBtns) {
    XBtn.addEventListener("click", function() {
        XBtn.parentElement.style.left = "-450px"
    });
}

// Close sidebars on scroll (to avoid weird behaviour)
window.onscroll = function() {
  if (!(window.innerHeight + window.pageYOffset >= document.body.offsetHeight)) {
    for (let sbar of sidebars) {
      sbar.style.left = "-450px"; 
    }
  }
}
