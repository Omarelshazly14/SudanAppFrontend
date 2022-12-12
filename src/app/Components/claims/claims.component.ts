import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../Services/repository.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  public claims: [] = [];

  constructor(
    public repo: RepositoryService,
  ) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () => {
    this.repo.getData('claims')
      .subscribe(res => {
        this.claims = res as [];
      })
  }

}
