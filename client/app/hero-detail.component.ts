import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  styleUrls: ['app/hero-detail.component.css'],
  templateUrl: 'app/hero.component.html'
})

export class HeroDetailComponent implements OnInit{
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false;

  constructor (
    private router: Router,
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if(params['id'] !== undefined) {
        let id = +params['id'];
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save() {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero;

        if(this.route.snapshot.url[0].path == 'detail') {
          let link = ['/detail', this.hero.id];
          this.router.navigate(link);
        } else {
          this.goBack(hero);
        }
      })
      .catch(error => this.error = error);

  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
