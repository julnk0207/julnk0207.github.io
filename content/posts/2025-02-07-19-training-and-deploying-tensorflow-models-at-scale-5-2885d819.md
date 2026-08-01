---
title: "[Hands-On ML] 19. Training and Deploying TensorFlow Models at Scale - 5"
description: "Whichever you use, synchronous or asynchronous, parameter server should send parameters to all mirrored models at the starting point of each step. This can cause bandwidth…"
date: 2025-02-07
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

## Bandwidth Saturation

Whichever you use, synchronous or asynchronous, parameter server should send parameters to all mirrored models at the starting point of each step. This can cause bandwidth saturation, which can make adding more GPU does not work at all.

Bandwidth saturation is less serious in small model and large but sparse model.

One solution to bandwidth saturation is PipeDream. This method decreases network communications more than 90%.

The core technique of PipeDream is pipeline parallelism. This separates model into consecutive stages and train each stage in different machines. Each stage performs one forward prop and one backprop per each stage. See the following steps.

1. Get mini-batch from input queue and process.
2. Send the result of step 1 to the next stage.
3. Get a gradient mini-batch from gradient queue and update model parameters by backprop.
4. Send the backpropagated gradient to the prior stage.

However, PipeDream does not work well. This could also cause stale gradient problem. To apply the gradient of a mini-batch, the gradient should go through multiple stages.

To alleviate the stale gradient problem, weight stashing is devised. Each stage saves the weight during the forward prop and restore when backprop.

There are also recent techniques such as Pathways.

## TensorFlow Cluster

TensorFlow Cluster is a group of TensorFlow process run in different machines. Clusters communicates each other to finish training.

Individual TF process in cluster is called ‘task’ or ‘TF server’. Task is composed of IP address, port, and ‘type’. There are 4 types.

- worker: Perform computations in machine with GPU.
- chief: Perform computations (similar to worker) and do additional works (e.g. writing log, saving checkpoints)
- parameter server(ps): Save parameters.
- evaluator: Evaluate.

The following is an example of cluster specification and structure of tensorflow clusters.

```python
cluster_spec = {
    "worker": [
        "machine-a.example.com:2222",     # /job:worker/task:0
        "machine-b.example.com:2222"      # /job:worker/task:1
    ],
    "ps": ["machine-a.example.com:2221"]  # /job:ps/task:0
}
```

For specific codes see ‘Go for Codes’.

[Go for Codes](https://github.com/Hyun3246/Warehouse/blob/dd9589dbe2807974cfdb1bbf350b333cae0ae4b1/Hands-On%20ML/Chapter_19_Training_and_Deploying_TensorFlow_Models_at_Scale.ipynb)

*All images, except those with separate source indications, are excerpted from lecture materials.*
