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
    minZoom: 6.5
});

map.on('load', () => {
  map.dragRotate.disable();
  map.keyboard.disableRotation();
});

/* All the points that open a popup.
 * Not necessarily same category!  */
const moscowPopups = {
    "features": [
        {
        "type": "Feature",
        "properties": {
            "title": "Парк Горького",
            "description": "Зенитные орудия в Парке Горького",
            "image": "http://www.world-war.ru/wp-content/uploads/2015/06/41.jpg",
            "hover": ""
        },
        "geometry": {
            "coordinates": [37.600265, 55.727964],
            "type": "Point"
        },
        "id": "346b45f8fad60c265d9d798d1dbdb18e"
        },
        {
        "type": "Feature",
        "properties": {
            "title": "Большой Театр",
            "image": "http://www.world-war.ru/wp-content/uploads/2015/06/271.jpg",
            "description": "Маскируют Большой Театр (1941)",
            "hover": ""
        },
        "geometry": {
            "coordinates": [37.618541, 55.760239],
            "type": "Point"
        },
        "id": "a29a54372736b2a7ecf8cd556dc375f7"
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
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [37.61683344841, 55.7558372575]
        },
        "id": "Zhukov"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [37.50451326370, 55.73068665750]
        },
        "id": "VictoryMuseum"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [37.50700235366821, 55.731698550554896]
        },
        "id": "VictoryMonument"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [37.61616826057434, 55.754817688690295]
        },
        "id": "UnknownSoldier"
      },
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
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${feature.properties.title}</h3>
        <img src="${feature.properties.image}" class="hover-grow" style="max-width: 200px;"></img>
        <p>${feature.properties.description}</p>`
      )
    )
    .addTo(map);
}

for (const feature of moscowSidebars.features) {
    const parent = document.getElementById(`${feature.id}`);  // ! the sidebar. This is why html id must be the same as geojson id.
    const el = document.createElement('div');
    el.classList.add('marker');

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
window.addEventListener('scroll', function() {
  for (let sbar of sidebars) {
    sbar.style.left = "-450px"; 
  }
});



///// This thing down here uses layers and tilesets. Probably won't need
// map.on('click', (event) => {
// const features = map.queryRenderedFeatures(event.point, {
//     layers: ['moscow-points']
// });
// if (!features.length) {
//     return;
// }
// const feature = features[0];

// const popup = new mapboxgl.Popup({ offset: [0, -15] })
// .setLngLat(feature.geometry.coordinates)
// .setHTML(
//     `<img style="max-width: 100%;" src="${feature.properties.image}"></img><p style="color: black;">${feature.properties.description}</p>`
// )
// .addTo(map);
// });
