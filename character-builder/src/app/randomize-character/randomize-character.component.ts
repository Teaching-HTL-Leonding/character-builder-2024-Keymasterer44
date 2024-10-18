import {Component, inject, signal} from '@angular/core';
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
  url = signal<string |null>(null)

  async createRandomCharacter() {
    const options = await this.createCharacterService.getRandomImageOptions()
    this.characterOptions.set(options);
    await this.setUrl();
  }

  async increaseScale() {
    if (this.scaleFactor() >= 2) return;
    this.scaleFactor.update((prev) => (prev*10+1)/10);
    await this.setUrl();
  }

  async decreaseScale() {
    if (this.scaleFactor() <= 0.1) return
    this.scaleFactor.update((prev) => (prev*10-1)/10);
    await this.setUrl();
  }

  async setUrl() {
    if (!this.characterOptions()) return;
    this.url.set((await this.createCharacterService.buildCharacter(this.characterOptions()!.eye, this.characterOptions()!.hasHammer, this.characterOptions()!.mouth, this.characterOptions()!.rightHand, this.characterOptions()!.hasTail)).url + "?scale=" + this.scaleFactor());
  }
}
