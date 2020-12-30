import { BIRD_MATERIAL_URI, VIDEO_MATERIAL_URI } from '../services/url.consts';

import {
  StandardMaterial, Texture, VideoTexture, Scene,
} from 'babylonjs';

export class MaterialBuilder {
    static getBirdMaterial = (scene: Scene): StandardMaterial => {
      const birdMaterial = new StandardMaterial('image_bird', scene);
      birdMaterial.diffuseTexture = new Texture(BIRD_MATERIAL_URI, scene);
      birdMaterial.diffuseTexture.level = 5;

      return birdMaterial;
    }

    static getVideoMaterial = (scene: Scene): StandardMaterial => {
      const videoMaterial = new StandardMaterial('video_planet', scene);
      const videoTexture = new VideoTexture('video_planet_texture', [VIDEO_MATERIAL_URI], scene);
      videoTexture.video.currentTime = 0;
      videoTexture.level = 8;
      videoMaterial.diffuseTexture = videoTexture;

      return videoMaterial;
    }
}
