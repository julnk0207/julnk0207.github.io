---
title: "[Python for ML] 18. Linear Regression - 7"
description: "성능 측정을 위해 train set과 test set으로 데이터를 나눌 수 있다. 하지만 Dev set(Validation set)을 추가로 두어 모델 생성 시 모델의 성능을 평가할 수 있다. Test set과의 다른 점이라고 하면 dev set은 훈련 중간에도 사용할 수 있다는 것이다."
date: 2024-08-17
category: "Online Open Course"
subcategory: "Python for ML"
tags:
  - "Python for ML"
  - "Python"
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

## Train, Dev, Test set

성능 측정을 위해 train set과 test set으로 데이터를 나눌 수 있다. 하지만 Dev set(Validation set)을 추가로 두어 모델 생성 시 모델의 성능을 평가할 수 있다. Test set과의 다른 점이라고 하면 dev set은 훈련 중간에도 사용할 수 있다는 것이다.

세 set를 나누는 비율은 보통 Train:Dev:Test = 6:2:2 로 한다.

## K-Fold 교차 검증

K-Fold 교차 검증(K-Fold Cross Validation)은 학습 데이터를 K번 나눠서 test와 train을 하는 것이다. 이후에 test의 평균 값을 사용한다.

## Leave One Out

한 번에 한 개의 데이터만 test set으로 사용하여 총 데이터 개수만큼 test를 하는 방법이다.

## 기타 방법들

다음은 K-Fold와 유사한 기타 교차 검증 방법들이다.

| 방법 | 설명 |
| --- | --- |
| RepeatedKFold | 중복이 포함된 K-Fold 생성 |
| LeavePOut | 한 번에 P개의 데이터를 뽑아서 test set으로 사용 |
| ShuffleSplit | 독립적인(중복되는) 데이터를 샘플링 |
| StratifiedKFold | Y값의 비율에 따라 샘플링 |
| GroupKFold | 그룹별로 데이터를 샘플링 |

눈여겨 볼 것은 StratifiedKFold이다. 만약 암 환자의 데이터를 분석하려는데 암 환자가 아닌 사람이 90%, 환자가 10%라 하자. Train set에서는 앞선 비율을 유지하고, test set에서는 위 비율을 유지하지 않는다면 성능을 제대로 측정할 수 없을 것이다. 이 비율을 준수하는 방법이 바로 StratifiedKFold이다.

[실습 코드 보러가기](https://github.com/Hyun3246/Code-Warehouse/blob/main/Python%20for%20ML/Cross_Validation.ipynb)

*별도의 출처 표시가 있는 이미지를 제외한 모든 이미지는 강의자료에서 발췌하였음을 밝힙니다.*
