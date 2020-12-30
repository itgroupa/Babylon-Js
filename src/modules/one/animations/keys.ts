import { IAnimationKey, Vector3 } from 'babylonjs';

export class KeysBuilder {
    static getKeysForButtons = (vector: Vector3): Array<IAnimationKey> => {
      const keys: Array<IAnimationKey> = [];
      keys.push({
        frame: 0,
        value: vector,
      });

      keys.push({
        frame: 15,
        value: new Vector3(vector.x, vector.y - 0.06, vector.z),
      });

      keys.push({
        frame: 30,
        value: vector,
      });
      return keys;
    }
}
