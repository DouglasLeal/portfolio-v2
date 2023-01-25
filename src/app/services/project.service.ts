import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = "https://raw.githubusercontent.com/DouglasLeal/dados-portfolio/main/data.json";

  constructor(private http: HttpClient) { }

  get(): Observable<Project[]>{
    return this.http.get<Project[]>(this.url);
  }
}
