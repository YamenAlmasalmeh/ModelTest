import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

const classifiers = {};
let net;

async function trainClassification(webcam, classifier, classId) {
  if (!webcam) {
    return;
  }
  if (!net) {
    net = await mobilenet.load();
  }

  // Capture an image from the web camera.
  const img = await webcam.capture();

  // Get the intermediate activation of MobileNet 'conv_preds' and pass that
  // to the KNN classifier.
  const activation = net.infer(img, "conv_preds");

  // Pass the intermediate activation to the classifier.
  classifier.addExample(activation, classId);

  // Dispose the tensor to release the memory.
  img.dispose();
}

function createClassifier(key, classifier) {
  classifiers[key] = classifier;
}

function getClassifier(key) {
  return classifiers[key];
}

async function getNet() {
  if (!net) {
    net = await mobilenet.load();
  }
  return net;
}

export default {
  getNet,
  createClassifier,
  getClassifier,
  trainClassification
};
