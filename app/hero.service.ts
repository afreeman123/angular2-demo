import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

//injectable will emit metadata about our service
@Injectable()
export class HeroService{
  getHeroes() {
    //promise is a promise to call back later once results are ready
    return Promise.resolve(HEROES);
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
