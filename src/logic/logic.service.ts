import { Injectable } from "@nestjs/common";

@Injectable()
export class LogicService{

      Distance(pointA: { latitude: number; longitude: number }, pointB: { latitude: number; longitude: number }): number {
        const earthRadiusKm = 6371;
        const latA = this.degreesToRadians(pointA.latitude);
        const lngA = this.degreesToRadians(pointA.longitude);
        const latB = this.degreesToRadians(pointB.latitude);
        const lngB = this.degreesToRadians(pointB.longitude);
    
        const dLat = latB - latA;
        const dLng = lngB - lngA;
    
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(latA) * Math.cos(latB) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = earthRadiusKm * c;
        return distance;
      }
    
      private degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
      }

      speed(distance:number, time:number): number {
        return distance/time
      }
      time(distance:number, speed:number): number {
        return distance/speed
      }
      totalDistance(pointA: { latitude: number; longitude: number }, route:number[]): number {

        let totalD = 0
        const pointB ={latitude:0,longitude:0}
        route.map((index,value)=>{
          if(value%2==0)
          {
            pointB.latitude = index
          }else{
            pointB.longitude = index
          }
          totalD += this.Distance(pointA,pointB)
        })
        return totalD
      }
      Result(pointA:{latitude:number,longitude:number},time:number,id:string)
      {
      
      }
}
    

