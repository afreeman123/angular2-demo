import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  styleUrls: ['app/hero-detail.component.css'],
  templateUrl: 'app/hero.component.html'
})

export class HeroDetailComponent {
  hero: Hero;

  constructor (
    private heroService: HeroService,
    private routeParams: RouteParams
  ) { }

  ngOnInit() {
    let id = +this.routeParams.get('id');
     //id is a number, routeparams are always string. JS operator + converts the routeparam value to a number
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
