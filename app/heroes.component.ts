//One or more import statements to referenc things we need
import { Component } from '@angular/core'; //needed to define component
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

//@Component decorator tells angular what template to use and how to create the component
@Component({
  selector: 'my-heroes', //simple CSS selector
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent],
  //back ticks instead of quotes
  templateUrl: 'app/heroes.component.html'
})
//AppComponent is the root of the app
//component class controls appearance and behaviour of a view through its template
//implements is essentially angular dependency injection
export class HeroesComponent implements OnInit{
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  getHeroes() {
  this.heroService.getHeroes().then(
      heroes => this.heroes = heroes
    );
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
  }
} //export it so we can import it elsewhere
