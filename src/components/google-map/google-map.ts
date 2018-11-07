import { Component, ViewChild } from '@angular/core';



import { Geolocation } from '@ionic-native/geolocation';
import {Location,Places, Result} from '../../providers/services-google-places/googlePlaces.model';
//import {ServicesGooglePlacesProvider} from '../../providers/services-google-places/services-google-places';
import { HttpClient } from '@angular/common/http';

import {} from 'google-maps';




@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  
  @ViewChild("map") mapElement;
  map:google.maps.Map;
  google:any;
  latitude:number;
  longitud:number;
  jsonres:any;
  places:Places;
  resultados:Array<Result>;
  coordendas_lugares:Array<Location>;
  coordsG: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
 

  
 //private servicesGooglePlacesProvider:ServicesGooglePlacesProvider 
  constructor(private geolocation:Geolocation, private http:HttpClient) {
  
  }

  
  ngOnInit(){
   
    this.initMap();
    this.obtenerLocalizacion();
    
    
    
  
  }

 

  

  obtenerLocalizacion=async()=>{
    await this.geolocation.watchPosition({enableHighAccuracy:true}).subscribe((resp)=>{
      
      this.latitude=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
      console.log(this.latitude);
      console.log(this.longitud)
      
      
      this.mapOptions=this.crearOpciones();
      this.map.setOptions(this.mapOptions);
     // this.initMap();
     this.pintarMarcador(this.coordsG,this.map,"Me encuentro aquí!");
      this.obtenerLugares();
      
    }, error => console.log('Error getting location', error))
  }
  crearOpciones(){
     this.coordsG= new google.maps.LatLng(this.latitude,this.longitud)
      const mapOptions: google.maps.MapOptions={
        center: this.coordsG,
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      return mapOptions;
  }
  initMap(){
   
   //this.obtenerLocalizacion();
   
   this.mapOptions=this.crearOpciones();
    this.map=new google.maps.Map(this.mapElement.nativeElement,this.mapOptions);
    
   //this.pintarMarcador(this.coordsG,this.map,"Me encuentro aquí!");
   
  
      }

      pintarMarcador(coords:any, map:any, tit:any){
        
         const marker:google.maps.Marker= new google.maps.Marker({
          map:this.map,
          position:coords,
          title:tit,
          //animation: google.maps.Animation.DROP,
          
          
          
        });
        //marker.setTitle(tit);
        //marker.setMap(this.map);
        marker.addListener('click',function() {
          console.log("hola");
         // map.setZoom(8);
         // map.setCenter(marker.getPosition())
        });
        
      }
    


   //   array=[1,2,3,4,5];
    //obtenerLugares=()=>{
     //  this.servicesGooglePlacesProvider.obtenerLugares()
      //.then(res=>{
        //console.log(res)
       // this.coordendas_lugares=res
        //console.log(this.coordendas_lugares);
        

        //for(let num of this.array){
          
          //console.log(num);
        //}
     
      //})
      //.catch(error=>console.error(error)
      //);
     
      obtenerLugares=async()=>{
        console.log("entré");
        console.log(this.latitude,this.longitud)
      await this.http.get("https:maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.latitude+"%2C"+this.longitud+"&radius=5000&type=point_of_interest&keyword=cruise&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg")
        .subscribe(res=>{
          console.log(res);
          this.places= res as Places;
          console.log(this.places.results);
          for(let lugar of this.places.results){
            console.log(lugar);
            this.pintarMarcador(lugar.geometry.location,this.map,lugar.name);
          }
        })
        
      }

    }
     
   
   
      

    
  
    
  
