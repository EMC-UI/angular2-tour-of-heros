import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-grid',
    templateUrl: 'app/heroes-grid.component.html',
    styleUrls: ['app/heroes-grid.component.css'],
    providers: [HeroService]
})

export class HeroesGridComponent implements OnChanges {
    @Input() comicId: number;
    heroes: Hero[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    ngOnChanges() {
          let id = this.comicId;
          console.log('getting heroes for comic with id: ', id);
        this.heroService
          .getHeroesForComic(id)
          .subscribe(
             /* happy path */ p => this.heroes = p,
             /* error path */ e => this.errorMessage = e,
             /* onComplete */ () => this.isLoading = false);
    }

    gotoDetail(hero: Hero) {
        let link = ['/hero-detail', hero.id];
        this.router.navigate(link);
    }
}
