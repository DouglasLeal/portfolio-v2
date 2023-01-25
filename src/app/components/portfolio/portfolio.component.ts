import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  private projects: Project[] = [];
  public projectsFiltered: Project[] = [];
  public categories: string[] = [];
  public filter: string = "";

  constructor(private projectService: ProjectService) {
        
  }
  ngOnInit(): void {
    this.listProjects();
  }

  listProjects(): void{
    this.projectService.get().subscribe(result => {
      this.projects = result;
      this.projectsFiltered = result;
      this.generateCategoriesList();
    });
  }

  generateCategoriesList(): void{
    this.projects.forEach(p => {
      p.category?.forEach(c => {
        c = c.toLowerCase();

        if(!this.categories.includes(c)){
          this.categories.push(c)
        }
      });
    });

    this.categories = this.categories.sort();
  }

  toFilter(): void{
    this.projectsFiltered = [];

    this.projects.forEach(p => {
      p.category?.forEach(c => {
        c = c.toLowerCase();

        if(c.indexOf(this.filter.toLowerCase()) >= 0){
          if(!this.projectsFiltered.includes(p)){
            this.projectsFiltered.push(p)
          }
        }
      })
    });
  }
}
