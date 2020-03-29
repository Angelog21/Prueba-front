import { Diary } from './../interfaces/diary';
import { Component } from '@angular/core';
import { DiaryService } from './../services/diary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  diary:Diary[];
  
  constructor(private DiaryService: DiaryService) { 
    this.getDiary()
  }

  getDiary(){
    this.DiaryService.get().subscribe((data:Diary[])=>{
      this.diary = data;
    }, (error)=>{
      console.log(error)
    });
  }

  delete(id){
    if(confirm('Seguro que deseas eliminar la Agenda?')){
      this.DiaryService.delete(id).subscribe((data)=>{
        this.getDiary();
        alert('Eliminado exitosamente');
      },
      (error)=>{
        console.log(error);
      })
    }
  }
}
