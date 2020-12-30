import { SCENE_ROOT_URI, SCENE_NAME_URI } from './url.consts';

import {
  Engine, SceneLoader, Scene,
} from 'babylonjs';

export class SceneLoaderService {
    static loadScene =
        (en: Engine):Promise<Scene> => SceneLoader.LoadAsync(SCENE_ROOT_URI, SCENE_NAME_URI, en);
}
