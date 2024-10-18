import {Component, computed, effect, inject, signal} from '@angular/core';
import {CreateCharacterService, BuildCharacterRequest} from '../create-character.service';

@Component({
  selector: 'app-randomize-character',
  standalone: true,
  imports: [],
  templateUrl: './randomize-character.component.html',
  styleUrl: './randomize-character.component.css'
})
export class RandomizeCharacterComponent {
  private readonly createCharacterService = inject(CreateCharacterService);
  characterOptions = signal<BuildCharacterRequest | null>(null)
  scaleFactor = signal(1);
  url = computed(() => this.getUrl());

  constructor() {
    effect(async () => {
      if (!this.characterOptions()) return;
    })
  }

  async createRandomCharacter() {
    const options = await this.createCharacterService.getRandomImageOptions()
    this.characterOptions.set(options);
  }

  increaseScale() {
    if (this.scaleFactor() >= 2) return;
    this.scaleFactor.update((prev) => (prev*10+1)/10);
  }

  decreaseScale() {
    if (this.scaleFactor() <= 0.1) return
    this.scaleFactor.update((prev) => (prev*10-1)/10);
  }

  async getUrl(): Promise<string | null> {
    if (!this.characterOptions()) return null;
    return (await this.createCharacterService.buildCharacter(this.characterOptions()!.eye, this.characterOptions()!.hasHammer, this.characterOptions()!.mouth, this.characterOptions()!.rightHand, this.characterOptions()!.hasTail)).url + "?scale=" + this.scaleFactor()
  }
}
