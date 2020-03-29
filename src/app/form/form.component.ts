import { DiaryService } from './../services/diary.service';
import { Diary } from './../interfaces/diary';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  diary: Diary = {
    title:null,
    description:null,
    tag:null,
    site:null,
    date:null
  }; 
  id : any;
  results: Diary[];
  editMode: boolean = false;

  constructor(private diaryService:DiaryService, private activatedRoute : ActivatedRoute){

    this.id = this.activatedRoute.snapshot.params['id'];

    if(this.id){
      this.editMode = true;
      this.diaryService.get().subscribe((data: Diary[])=>{
        this.results = data;
        this.diary = this.results.find((n)=>{
          return n.id == this.id;
        });
      },
      (error)=>{
        console.log(error);
      });
    }else{
      this.editMode = false;
    }
  }

  ngOnInit(): void {
  }

  saveDiary(){
    if(this.editMode){
      this.diaryService.put(this.diary)
      .subscribe((data)=>{
        alert('Agenda Actualizada');
        console.log(data);
      },(error)=>{
        console.log(error);
      });
    }else{
      this.diaryService.save(this.diary)
      .subscribe((data)=>{
        alert('Agenda guardada');
        this.diary = {
          title:null,
          description:null,
          tag:null,
          site:null,
          date:null
        }; 
      },(error)=>{
        console.log(error);
      });
    }
  }

}
