const socket = io(); // ise kya hogya ki connection req backend mei jayegi

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        socket.emit("send-location",{latitude,longitude}); //backend bhej diya
    }, 
    (error)=>{
    console.error(error);
    },
    {
        enableHighAccuracy:true,
        timeout:5000, // milliseconds
        maximumAge:0,
    });
}


const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:"Himanshu RANA"
}).addTo(map)


// empty object marker:

const markers = {};


//  by this its showing live location
socket.on("receive-location", (data)=>{
 const {id, latitude,longitude} = data;
 map.setView([latitude,longitude]);

 if(markers[id]){
    markers[id].setLatLng([latitude, longitude]);
 }
 else{
    markers[id] = L.marker([latitude, longitude]).addTo(map);
 }
});


socket.on("user-disconnected", (id)=> {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
