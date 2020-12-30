import { Animation } from 'babylonjs';

export class AnimationBuilder {
    static getAnimationForButton = (name: string): Animation => new Animation(
      name,
      'position',
      60,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT,
    )
}
