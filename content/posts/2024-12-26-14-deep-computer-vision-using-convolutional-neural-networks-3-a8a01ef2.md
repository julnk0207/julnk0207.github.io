---
title: "[Hands-On ML] 14. Deep Computer Vision Using Convolutional Neural Networks - 3"
description: "First, make a ResidualUnit layer. By making a class, it could be used as other keras layers in model."
date: 2024-12-26
category: "Book"
subcategory: "Hands-On ML"
tags:
  - "Hands-On ML"
  - "Python"
  - "Keras"
  - "Neural Networks"
  - "Computer Vision"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## ResNet-34 using keras

First, make a ResidualUnit layer. By making a class, it could be used as other keras layers in model.

```python
DefaultConv2D = partial(tf.keras.layers.Conv2D, kernel_size=3, strides=1,
                        padding='same', kernel_initializer='he_normal', use_bias=False)

class ResidualUnit(tf.keras.layers.Layer):
    def __init__(self, filters, strides=1, activation='relu', **kwargs):
        super().__init__(**kwargs)
        self.activation = tf.keras.activations.get(activation)
        self.main_layers = [
            DefaultConv2D(filters, strides=strides),
            tf.keras.layers.BatchNormalization(),
            self.activation,
            DefaultConv2D(filters),
            tf.keras.layers.BatchNormalization()
        ]
        self.skip_layers = []
        if strides > 1:
            self.skip_layers = [
                DefaultConv2D(filters, kernel_size=1, strides=strides),
                tf.keras.layers.BatchNormalization()
            ]

    def call(self, inputs):
        Z = inputs
        for layer in self.main_layers:
            Z = layer(Z)
        skip_Z = inputs
        for layer in self.skip_layers:
            skip_Z = layer(skip_Z)
        return self.activation(Z + skip_Z)
```

`main_layers` is for right part in the structure, and `skip_layers` is for left part, only used when stride is larger than 2.

In `call()` method, inputs will go into main layer (and skip layer, if exist). The results will be added at the end.

Now, the preparation for ResNet structure is over. The code is for ResNet-34.

```python
model = tf.keras.Sequential([
    DefaultConv2D(64, kernel_size=7, strides=2, input_shape=[224, 224, 3]),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.MaxPool2D(pool_size=3, strides=2, padding='same'),
])
prev_filters = 64
for filters in [64] * 3 + [128] * 4 + [256] * 6 + [512] * 3:
    strides = 1 if filters == prev_filters else 2
    model.add(ResidualUnit(filters, strides=strides))
    prev_filters = filters
model.add(tf.keras.layers.GlobalAvgPool2D())
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(10, activation='softmax'))
```

The most complicated part is adding `ResidualUnit` to the model. First 3 RU has 64 filters, and the next 4 RU has 128 filters. If the number of filter is equal to the previous one, set stride as 1.

The code above is similar to the structure below.

## Using Pre-trained Model

There are pre-trained models in keras. It is very easy to use.

```python
model = tf.keras.applications.resnet50.ResNet50(weights='imagenet')
```

When using pre-trained model, it is important to check the size of input images. Using `Resizing` layer would solve the point.

To print the top-K predictions after training, use `decode_predictions()` function.

```python
top_K = tf.keras.applications.resnet50.decode_predictions(Y_proba, top=3)
for image_index in range(len(images)):
    print(f"Image #{image_index}")
    for class_id, name, y_proba in top_K[image_index]:
        print(f"{class_id} -{name:12s}{y_proba:.2%}")
```

## Transfer Learning using Pre-Trained Model

It is also possible to use pre-trained model for transfer learning.

The code below uses Xception model for transfer learning. The top layer would be excluded, to add appropriate one for the problem we will solve.

```python
base_model = tf.keras.applications.xception.Xception(weights='imagenet',
                                                     include_top=False)
avg = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)
output = tf.keras.layers.Dense(n_classes, activation='softmax')(avg)
model = tf.keras.Model(inputs=base_model.input, outputs=output)
```

Freeze weights at the begging of training.

```python
for layer in base_model.layers:
    layer.trainable = False
```

After compiling and training model, unfreeze the weights of upper layers. Increase learning rate and compile model again after unfreezing.

```python
for layer in base_model.layers[56:]:
    layer.trainable = True
```

## Classification and Location Prediction

When predicting the location of objects, we use bounding box. The most typical method is to predict the followings.

- Horizontal coordinate of the center of the object
- Vertical coordinate of the center of the object
- Width
- Height

Therefore, we need to predict 4 numbers.

We don’t have to modify the model dramatically. Just add dense layer with 4 units and train by using MSE loss.

```python
base_model = tf.keras.applications.xception.Xception(weights='imagenet',
                                                     include_top=False)
avg = tf.keras.layers.GlobalAveragePooling2D()(base_model.output)
class_output = tf.keras.layers.Dense(n_classes, activation='softmax')(avg)
loc_output = tf.keras.layers.Dense(4)(avg)
model = tf.keras.Model(inputs=base_model.input,
                       outputs=[class_output, loc_output])
model.compile(loss=['sparse_categorical_crossentropy', 'mse'],
              loss_weights=[0.8, 0.2], optimizer=optimizer, metrics=['accuracy'])
```

However, train set images should have bounding boxes before training. We can add the boxes manually(with useful tools), or crowdsourse.

Instead of MSE, IoU(Intersection of Union) is widely used for bounding box. It is the value of the overlapped area divided by the total area.

[코드 보러가기](https://github.com/Hyun3246/Code-Warehouse/blob/85bf1735378fe510e4ce916be562a87821bcd194/Hands-On%20ML/Chapter_14_Deep_Computer_Vision_with_Cnns.ipynb)

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
