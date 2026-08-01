---
title: "[Hands-On ML] 19. Training and Deploying TensorFlow Models at Scale - 2"
description: "Vertex AI is a kind of platform of Google Cloud Platform(GCP). It supports following functions."
date: 2025-02-04
category: "Book"
subcategory: "Hands-On ML"
tags:
  - "Hands-On ML"
  - "Python"
  - "TensorFlow"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## Vertex AI

Vertex AI is a kind of platform of Google Cloud Platform(GCP). It supports following functions.

- Upload dataset.
- Give a label.
- Store frequently used features in feature store and use while training.
- Automatic hyperparemeter tuning.
- Searching model architecture(AutoML).
- Train model in GPU, TPU server.
- Manage trained models.
- Batch prediction.

There are also many additional functions.

Follow the following steps when using Vertex AI to distribute model and make a prediction.

1. Authorization.
2. Make GCS bucket to save SavedModel. Set project id, bucket name, and location(region).
3. Upload directory to a new bucket. In GCS, file is called ‘blob’. The blob is stored withut directory, so use ‘/’ to make it look like the directory exists.
4. Use multithreading to speed up.
5. Inform Vertex AI about the model. Use ‘google-cloud-aiplatform’ library. Make new Vertex AI model by assigning name, GCS path, and container.
6. Make endpoint(a point that client application connects when accessing to a service) to distribute model.
7. Make a prediction. Transform image to python list first.
8. Remove endpoint to prevent additional cost.

If you need to do a number of predictions, request Vertex AI to do predictions instead of repeatedly calling prediction service.

For specific implementation, see Go for Codes.

[Go for Codes](https://github.com/Hyun3246/Warehouse/blob/bb5c2598c85d466bfb0bf9837533c1ddacb1ae91/Hands-On%20ML/Chapter_19_Training_and_Deploying_TensorFlow_Models_at_Scale.ipynb)

*All images, except those with separate source indications, are excerpted from lecture materials.*
