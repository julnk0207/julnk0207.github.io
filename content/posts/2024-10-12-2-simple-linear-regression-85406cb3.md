---
title: "[Deep Learning Basic Starting with TF] 2. Simple Linear Regression"
description: "선형 회귀(Linear Regression)는 데이터를 가장 잘 대변하는 직선을 찾는 것을 의미한다."
date: 2024-10-12
category: "Online Open Course"
subcategory: "Deep Learning Basic Starting with TF"
tags:
  - "Deep Learning Basic Starting with TF"
  - "Deep Learning"
  - "Linear Regression"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## 선형 회귀

선형 회귀(Linear Regression)는 데이터를 가장 잘 대변하는 직선을 찾는 것을 의미한다.

우리가 찾은 선형 회귀 식을 ’가설(hypothesis)’이라고도 하며, 가설 중에서 가장 적절한 것을 선택하는 것이 우리의 목표라고 할 수 있다.

가장 적절한 것을 선택할 때는 비용함수를 이용한다. 비용함수는 가설과 실제 데이터의 차이를 의미한다.

좀 더 수학적으로는 ‘오차 제곱의 평균’이다.

$$\displaystyle cost(W, b) = \frac{1}{m} \sum_{i=1}^{m}{(H(x_i) - y_i)^2}$$

우리의 목표는 비용함수를 최소화하는 W와 b를 찾는 것이다.

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
