import {Component, effect, inject, signal} from '@angular/core';
import {CreateCharacterService, eyeOptions, mouthOptions, rightHandOptions} from '../create-character.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.css'
})
export class CreateCharacterComponent {
  private readonly createCharacterService = inject(CreateCharacterService);
  readonly eyeOptions = eyeOptions;
  readonly mouthOptions = mouthOptions;
  readonly rightHandOptions = rightHandOptions;

  eye = signal(eyeOptions[0]);
  hasHammer = signal(false);
  mouth = signal(mouthOptions[0]);
  rightHand = signal(rightHandOptions[0]);
  hasTail = signal(false);

  imageUrl = signal<string | null>(null);

  async createCharacter() {
    const imageId = await this.createCharacterService.buildCharacter(
      this.eye(),
      this.hasHammer(),
      this.mouth(),
      this.rightHand(),
      this.hasTail()
    );
    console.log(imageId);
    this.imageUrl.set(imageId.url);
  }

  createRandomCharacter() {

  }
}
