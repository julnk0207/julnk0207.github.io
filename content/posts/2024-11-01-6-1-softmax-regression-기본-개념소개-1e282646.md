---
title: "[Deep Learning Basic Starting with TF] 6-1. Softmax Regression 기본 개념소개"
description: "이항 분류를 여러 번 하는 방식으로 다항 분류를 할 수 있다. 예를 들어, 다음과 같이 세 종류의 성적을 분류하는 과정을 생각할 수 있다."
date: 2024-11-01
category: "Online Open Course"
subcategory: "Deep Learning Basic Starting with TF"
tags:
  - "Deep Learning Basic Starting with TF"
  - "Deep Learning"
  - "Classification"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## 이항 분류와 다항 분류

이항 분류를 여러 번 하는 방식으로 다항 분류를 할 수 있다. 예를 들어, 다음과 같이 세 종류의 성적을 분류하는 과정을 생각할 수 있다.

그럼 다음과 같이 총 세 번의 계산 과정을 거쳐야 한다.

하지만 계산을 세 번이나 하면 너무 복잡하기 때문에, 하나의 matirx로 합쳐서 계산하기로 한다.

결과 vector의 각 요소들은 가설함수의 계산 결과가 될 것이다.

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
