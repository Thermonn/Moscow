mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcm1vbiIsImEiOiJja3k3ODlka2cwenRxMnZxY3kxd21kMzUxIn0.ZmjbPpuvTNPCnUazKleUvw';

var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/thermon/ckyhpenshfulv15nu9wr3kwk8',
    style: 'mapbox://styles/thermon/ckyszpiyw2s3w14lhb6h3tjfr',
    center: [37.618423, 55.751244],
    zoom: 9,
    minZoom: 6
});

const moscowPhotos = {
    "features": [
        {
        "type": "Feature",
        "properties": {
            "title": "Парк Горького",
            "description": "Зенитные орудия в Парке Горького",
            "image": "http://www.world-war.ru/wp-content/uploads/2015/06/41.jpg"
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
            "description": "Маскируют Большой Театр (1941)"
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

const moscowSidebar = {
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
      }
    ]
};


for (const feature of moscowPhotos.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'photo-marker';
  
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

for (const feature of moscowSidebar.features) {
    const el = document.createElement('div');
    el.classList.add('person-marker');
    // el.id = `${feature.id}`;
    el.setAttribute("onclick", "openSidebar" + `${feature.id}` + "()"); // find different solution later, as this requires many functions that do the same thing
    
    new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      
      .addTo(map);
}


// Open/close functions :)

//TODO: make function that closes sideBar if user clicks outside of element

function openSidebarZhukov() {
    document.getElementById("Zhukov").style.left = "0";
    // const smoke = document.createElement('div');
    // smoke.style.boxShadow = "0 0 100vw 0 rgba(0,0,0,0.4)";
}
function closeSidebarZhukov() {
    document.getElementById("Zhukov").style.left = "-450px";
}

function openSidebarVictoryMuseum() {
    document.getElementById("VictoryMuseum").style.left = "0";
}
function closeSidebarVictoryMuseum() { 
    document.getElementById("VictoryMuseum").style.left = "-450px"; 
}



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