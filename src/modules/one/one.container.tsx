import '../../styles/one_module.scss';

import { AnimationBuilder } from './animations/animation.builder';
import { KeysBuilder } from './animations/keys';
import { MaterialBuilder } from './materials/matial.builder';
import { SceneLoaderService } from './services/scene_loader.service';

import { GlobalProvider } from '../../providers';

import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { Engine, PointerEventTypes } from 'babylonjs';

const OneContainer: FC = () => {
  const { setLoading } = useContext(GlobalProvider);
  const [canvas, setCanvas] = useState(null as HTMLCanvasElement);
  useEffect(() => {
    if (canvas) {
      const engine = new Engine(canvas, true);
      setLoading(true);
      SceneLoaderService.loadScene(engine).then((scene) => {
        const renderLoop = () => {
          scene.render();
        };
        window.addEventListener('resize', () => { engine.resize(); });
        const birdMaterial = MaterialBuilder.getBirdMaterial(scene);

        const screen = scene.meshes.filter((n) => n.name === 'screen')[0];
        screen.material = birdMaterial;

        const playButton = scene.meshes.filter((n) => n.name === 'play_button')[0];
        playButton.isPickable = true;

        const stopButton = scene.meshes.filter((n) => n.name === 'stop_button')[0];
        stopButton.isPickable = true;

        const stopButtonAnimation = AnimationBuilder.getAnimationForButton('stop_button_animation');
        const startButtonAnimation = AnimationBuilder.getAnimationForButton('start_button_animation');

        const stopButtonAnimationKeys = KeysBuilder.getKeysForButtons(stopButton.position);
        const startButtonAnimationKeys = KeysBuilder.getKeysForButtons(playButton.position);

        stopButtonAnimation.setKeys(stopButtonAnimationKeys);
        startButtonAnimation.setKeys(startButtonAnimationKeys);

        const play = () => {
          screen.material = MaterialBuilder.getVideoMaterial(scene);

          playButton.animations = [];
          playButton.animations.push(startButtonAnimation);
          scene.beginAnimation(playButton, 0, 30, false, 1);
        };

        const stop = () => {
          screen.material = MaterialBuilder.getBirdMaterial(scene);
          stopButton.animations = [];
          stopButton.animations.push(stopButtonAnimation);
          scene.beginAnimation(stopButton, 0, 30, false, 1);
        };

        scene.onPointerObservable.add((pointer) => {
          if (pointer.type === PointerEventTypes.POINTERDOWN && pointer.pickInfo.pickedMesh) {
            switch (pointer.pickInfo.pickedMesh.name) {
              case (playButton.name):
                play();
                break;
              case (stopButton.name):
                stop();
                break;
              default:
                break;
            }
          }
        });

        engine.runRenderLoop(renderLoop);
        setLoading(false);
      });
    }
  }, [canvas]);
  return (
    <canvas className="canvas_one" ref={(el) => setCanvas(el)} />
  );
};

export default OneContainer;
