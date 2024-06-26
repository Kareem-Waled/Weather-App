import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     title(title: any) {
       throw new Error('Method not implemented.');
     }
     searchForm! : FormGroup;
     weather : any;
     imageUrl: string = '';
     constructor(private fb:FormBuilder,
           private service:WeatherService
     ){}

     ngOnInit(){
      this.searchForm = this.fb.group({
        city: [null,Validators.required]
      })
     }

     searchWeather(){
      console.log(this.searchForm.value);
      this.service.searchWeatherByCity(this.searchForm.get(['city'])!.value).subscribe((resp) => {
        console.log(resp);
        this.weather = resp.data;
        this.imageUrl = resp.data.bg_image; // assuming the image URL is stored in `resp.data.image`
      })
     }
}
