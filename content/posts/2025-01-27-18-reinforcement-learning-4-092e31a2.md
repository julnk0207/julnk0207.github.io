---
title: "[Hands-On ML] 18. Reinforcement Learning - 4"
description: "In basic deep Q-learning, model is used both in making prediction and setting a target. This can make the network unstable. To solve this, two DQN can be used. First one is an…"
date: 2025-01-27
category: "Book"
subcategory: "Hands-On ML"
tags:
  - "Hands-On ML"
  - "Optimization"
  - "Reinforcement Learning"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## Variation of Q-Learning

1. Fixed Q-value target
    
    In basic deep Q-learning, model is used both in making prediction and setting a target. This can make the network unstable. To solve this, two DQN can be used. First one is an online model, and the second one is a target model. As target model is less frequently updated, Q-value target is more stable.
    
2. Double DQN
    
    Instead of using a target model when choosing the next action, double DQN uses an online model. Target model is only used for estimating Q-value of the best action. This method can prevent the overestimation of Q-value.
    
3. Prioritized Experience Replay (PER)
    
    The basic idea of PER is sampling important experience more frequently from replay buffer. In specific, if an experience make the learning fast, it is considered as important.
    
    One way is to gauge TD error *δ* = *r* + *γ* ⋅ *V*(*s*′) − *V*(*s*). Big TD error means transfer (*s*, *a*, *s*′) is surprising. Priority of experience is setted *p* = |*δ*|. The probability of sampling an experience with priority p is proportional to *pζ*. *ζ* is a hyperparameter, and if it is close to 0, it is an uniform sampling.
    
    While training, we have to lessen the weight of important experiences as the sample is biased. Training weight is defined as *w* = (*nP*)−*β*, where n is the number of experiences in replay buffer and *β* is a hyperparemeter.
    
4. Dueling DQN (DDQN)
    
    Q-value of state-action pair (*s*, *a*) can be represented as *Q*(*s*, *a*) = *V*(*s*) + *A*(*s*, *a*). *V*(*s*) is a value of state s, and *A*(*s*, *a*) is an advantage of selecting action a at state s, comparing to other possible actions. The value of state is same as Q-value of the best action $a^{\*}$, which means $V(s) = Q(s, a^{\*})$ and $A(s, a^{\*})=0$.
    
    At dueling DQN, model estimates both value of state and advantage of all possible actions. As the advantage of the best action is 0, subtract max advantage from all advantages to make the best action have max advantage.
    

## Other RL Algorithms

There are various other RL algorithms.

- AlphaGo
- Actor-Critic
- A3C (Asynchronous Advantage Actor-Critic)
- A2C (Advantage Actor-Critic)
- SAC (Soft Actor-Critic)
- PPO (Proximal Policy Optimization)
- Curiosity-based Exploration: Make an agent to explore environment only based on curiosity, except reward.
- Open-ended Learning (OEL): POET algorithm is well-known. It regularly competes agents and ensure that underperforming ones are replaced with better ones.

[Go for Codes](https://github.com/Hyun3246/Warehouse/blob/60bc3e1decec8d6334ce697d41d07bc70c6b245d/Hands-On%20ML/Chapter_18_Reinforcement_Learning.ipynb)

*All images, except those with separate source indications, are excerpted from lecture materials.*
