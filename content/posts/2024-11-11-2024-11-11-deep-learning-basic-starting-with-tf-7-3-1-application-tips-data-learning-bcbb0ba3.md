---
title: "[Deep Learning Basic Starting with TF] 2024-11-11-[Deep Learning Basic Starting with TF] 실습 7-3-1. Application Tips Data Learning"
description: "GAN(Generative Adversarial Network)을 사용하면 이상치 탐지를 수월하게 진행할 수 있다. 먼저, GAN을 정상 데이터로만 훈련한 뒤, 일반적인 데이터에 넣어서 해당 데이터가 이상치인지를 분석한다."
date: 2024-11-11
category: "Online Open Course"
subcategory: "Deep Learning Basic Starting with TF"
tags:
  - "Deep Learning Basic Starting with TF"
  - "Deep Learning"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## 이상치 탐지

GAN(Generative Adversarial Network)을 사용하면 이상치 탐지를 수월하게 진행할 수 있다. 먼저, GAN을 정상 데이터로만 훈련한 뒤, 일반적인 데이터에 넣어서 해당 데이터가 이상치인지를 분석한다.

## Fine Tuning, Feature Extraction

- Fine Tuning: 사전 훈련된 모델의 가중치가 새로운 데이터에 대해 학습되는 전이학습을 의미한다.
- Feature Extraction: 기존의 특징 집합에서 조합을 통해 새로운 특징을 생성해낸다.
    
    

이미 만들어진 모델로 새로운 특징을 판별해내고 싶다면 fine tuning과 feature extraction 중 하나를 선택할 수 있다.

~~사실 이번 강의는 강의자료에 비해 설명이 매우 부족하여, 위 내용이 새로 배운 것의 전부이다…~~

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
