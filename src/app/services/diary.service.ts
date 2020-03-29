import { Diary } from './../interfaces/diary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  API_ENDPOINT = 'https://agenda-api.dev/api';
  constructor(private HttpClient: HttpClient) {}

  get(){
    return this.HttpClient.get(this.API_ENDPOINT+'/diary');
  }

  save(diary: Diary){
    let json = JSON.stringify(diary);
    let params = "data="+json;

    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.HttpClient.post(this.API_ENDPOINT+'/diary', params, {headers:headers});
  }

  put(diary){
    let json = JSON.stringify(diary);
    let params = "data="+json;
    const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.HttpClient.put(this.API_ENDPOINT+'/diary/'+diary.id, params, {headers:headers});
  }

  delete(id){
    return this.HttpClient.delete(this.API_ENDPOINT+'/diary/'+id);
  }

}
