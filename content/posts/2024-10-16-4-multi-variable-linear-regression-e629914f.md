---
title: "[Deep Learning Basic Starting with TF] 4. Multi-variable Linear Regression"
description: "H ( x 1, x 2, x 3) = w 1 x 1 + w 2 x 2 + w 3 x 3 + b"
date: 2024-10-16
category: "Online Open Course"
subcategory: "Deep Learning Basic Starting with TF"
tags:
  - "Deep Learning Basic Starting with TF"
  - "TensorFlow"
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

## 다변량 회귀

변수(특성)가 여러 개인 다변량 회귀의 가설함수는 다음과 같다.

*H*(*x*1, *x*2, *x*3) = *w*1*x*1 + *w*2*x*2 + *w*3*x*3 + *b*

비용함수의 식도 동일하다.

$$\displaystyle cost(W, b) = \frac{1}{m} \sum_{i=1}^{m}{(H(x_1, x_2, x_3) - y_i)^2}$$

다만, 변수가 많아질수록 가설함수 식은 점점 더 길어질 것이다. 따라서 우리는 matrix를 도입해서 이를 해결한다.

$$\begin{pmatrix} x_1 & x_2 & x_3\end{pmatrix} \cdot \begin{pmatrix} w_1 \\ w_2 \\ w_3\end{pmatrix} = (x_1 w_1 + x_2 w_2 + x_3 w_3)$$

*H*(*X*) = *XW*

많은 이론에서는 *WTX* 로 쓰기도 하지만 tensorflow에서 구현할 때는 위의 방식처럼 쓰는 것이 더 편하다고 한다.

위처럼 matrix를 사용하면 변량(행)이 아무리 많아져도, 구하고자 하는 타깃값의 종류(결과 matrix의 열)이 아무리 많아져도 식은 항상 동일하다.

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
