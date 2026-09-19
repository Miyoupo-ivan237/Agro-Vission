import '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

const IMAGE_SIZE = 224;
const MIN_CONFIDENCE = 0.75;

let modelPromise;

export async function loadPlantModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      await tf.ready();
      return tf.loadLayersModel(
        bundleResourceIO(
          require('../assets/plant-model/model.json'),
          require('../assets/plant-model/group1-shard1ofN.bin')
        )
      );
    })();
  }

  return modelPromise;
}

export async function classifyPlantImage(imageBytes, labels) {
  if (!imageBytes || !labels?.length) {
    throw new Error('A real plant image and model labels are required.');
  }

  const model = await loadPlantModel();
  const input = decodeJpeg(imageBytes)
    .resizeBilinear([IMAGE_SIZE, IMAGE_SIZE])
    .toFloat()
    .div(255)
    .expandDims(0);

  let prediction;
  try {
    prediction = model.predict(input);
    const scores = await prediction.data();
    const index = scores.indexOf(Math.max(...scores));
    const label = labels[index];
    const confidence = scores[index] || 0;

    if (!label || label === 'not_a_plant' || label === 'unknown' || confidence < MIN_CONFIDENCE) {
      throw new Error('The image is unclear or does not contain a supported crop.');
    }

    return { label, confidence };
  } finally {
    input.dispose();
    if (prediction?.dispose) prediction.dispose();
  }
}
