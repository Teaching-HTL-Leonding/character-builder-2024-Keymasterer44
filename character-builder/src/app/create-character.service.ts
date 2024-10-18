import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

type Eye = "NoEye" | "HalfOpen" | "Closed" | "Open";
type Mouth = "NoMouth" | "Happy" | "Normal" | "Unhappy";
type RightHand = "NoHand" | "Normal" | "Victory";

type BuildCharacterRequest = {
  eye: Eye;
  hasHammer: boolean;
  mouth: Mouth;
  rightHand: RightHand;
  hasTail: boolean;
}

type BuildCharacterResponse = {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateCharacterService {
  private httpClient = inject(HttpClient);

  constructor() { }

  buildCharacter(eye: Eye, hasHammer: boolean, mouth: Mouth, rightHand: RightHand, hasTail: boolean): Promise<BuildCharacterResponse> {
    const reqBody: BuildCharacterRequest = {
      eye,
      hasHammer,
      mouth,
      rightHand,
      hasTail
    }
    return firstValueFrom(
      this.httpClient.post<BuildCharacterResponse>(
        'http://localhost:5110/build-image-url',
        reqBody
      )
    );
  }

  getRandomImageOptions(): Promise<BuildCharacterRequest> {
    return firstValueFrom(
      this.httpClient.get<BuildCharacterRequest>(
        'http://localhost:5110/get-random-image-options'
      )
    )
  }

  getImage(url: string): Promise<string> {
    return firstValueFrom(
      this.httpClient.get<string>(
        `http://localhost:5110/img/${url}`
      )
    )
  }
}
