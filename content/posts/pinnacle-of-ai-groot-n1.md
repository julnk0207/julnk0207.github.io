---
title: "Why Physical AI Attracts Me: Exploring the GR00T N1 Architecture"
description: "GR00T N1 shows how VLA models unite vision, language, generative modeling, control, and robotics—and why that breadth draws me to physical AI."
date: 2026-07-26
category: Physical AI
subcategory: VLA
tags:
  - Example
linkedin:
  status: review
  # LinkedIn: write a standalone professional post with a hook, 2-3 useful
  # takeaways, the article URL, and at most 3 relevant hashtags. Keep the total
  # under 3,000 characters and avoid a generic "I published a post" message.
  summary: >-
    Physical AI attracts me because it cannot be understood through a single AI
    discipline.

    While studying NVIDIA's GR00T N1 architecture, I encountered vision-language
    models, diffusion transformers, flow matching, action chunking, robot control,
    and several related VLA approaches.

    GR00T N1 showed me that VLA systems sit at the intersection of computer vision,
    language modeling, generative modeling, control, and robotics. That breadth is
    both the challenge and the reason I want to keep exploring this field.

    https://julnk0207.github.io/writing/pinnacle-of-ai-groot-n1/

    #PhysicalAI #Robotics #VLA

  # Leave this empty when creating an article. Buffer fills it after the first
  # draft is created. Never invent, reuse, edit, or clear it: the filename slug
  # identifies the article, and this immutable Buffer ID prevents duplicates.
  postId: "6a66056012fafbaf49e0c820"
x:
  status: review
  # X: state one core insight and include the article URL. Keep the complete
  # post at or below 280 characters, including the URL and at most 2 hashtags.
  summary: >-
    Physical AI demands more than expertise in one AI field. GR00T N1 connects
    vision, language, generative modeling, control, and robotics—exactly the breadth
    that draws me to VLA research.
    https://julnk0207.github.io/writing/pinnacle-of-ai-groot-n1/ #PhysicalAI #VLA

  # This follows the same ID rule as LinkedIn, but stores X's separate Buffer
  # post ID. Never copy an ID between platforms or articles.
  postId: "6a66056122bc282b887abe84"
---

When I started studying physical AI and vision-language-action (VLA) models, the first paper my mentor recommended was GR00T N1. I think this was because GR00T N1 is a prominent open foundation model for generalist robot control.

However, studying GR00T N1 proved more meaningful than learning about a single model architecture.

In this post, I will introduce the GR00T N1 family and explain why the interdisciplinary nature of VLA models attracts me to physical AI.

## Overall Architecture
GR00T N1 consists of two main components: a vision-language model (VLM) and a Diffusion Transformer (DiT)-based action module. The former is referred to as System 2, while the latter is called System 1.

<figure>
  <img src="https://arxiv.org/html/2503.14734v2/x2.png" alt="Overall architecture of the GR00T N1 vision-language-action model" />
  <figcaption>
    Figure 1. Overall architecture of GR00T N1. Source: <a href="https://arxiv.org/abs/2503.14734">GR00T N1: An Open Foundation Model for Generalist Humanoid Robots</a>.
  </figcaption>
</figure>

The conceptual data flow is straightforward. Image observations and language instructions enter the VLM and are encoded into latent representations. The action module conditions on these representations, the encoded robot state, noisy action embeddings, and the flow-matching timestep. The DiT predicts a velocity field that is integrated to transform noise into a continuous action chunk.

## System 2: VLM Backbone
The original GR00T N1 paper used NVIDIA Eagle-2 as its vision-language backbone. The latest version, GR00T N1.7, instead uses Cosmos-Reason2-2B, which is based on the Qwen3-VL architecture. The backbone receives images and text as inputs and produces latent representations that condition the action module through cross-attention.

## System 1: Action Head
In the paper, System 1 is described primarily as a DiT, but the complete action module contains several auxiliary components:

<figure>
  <img src="https://arxiv.org/html/2503.14734v2/x3.png" alt="Detailed architecture of the GR00T N1 action head" />
  <figcaption>
    Figure 2. GR00T N1 action-head architecture. Source: <a href="https://arxiv.org/abs/2503.14734">GR00T N1: An Open Foundation Model for Generalist Humanoid Robots</a>.
  </figcaption>
</figure>

- State Encoder: Takes the robot state and converts it into embeddings.
- Action Encoder: Takes a noisy action chunk with horizon $H$ and converts it into embeddings.
- DiT: Applies self-attention over robot-state and action representations and cross-attention to the VLM output. Rather than predicting denoised actions directly, it predicts the velocity field used to transform noise into actions.
- Action Decoder: Converts the resulting action representations into continuous, embodiment-dependent robot commands, such as joint commands or end-effector poses.

## Why Physical AI Attracts Me
As this overview shows, understanding the architecture requires background knowledge from several areas.

The following concepts are directly relevant to the architecture:

- [Action Chunking](https://arxiv.org/abs/2304.13705)
- [Diffusion Transformer](https://arxiv.org/abs/2212.09748)
- [Flow Matching](https://arxiv.org/abs/2210.02747)

The following related models and approaches also provided useful context:

- [Diffusion Policy](https://arxiv.org/abs/2303.04137)
- [RT-1](https://arxiv.org/abs/2212.06817)
- [RT-2](https://arxiv.org/abs/2307.15818)
- [$\pi_0$](https://arxiv.org/abs/2410.24164)
- [FAST](https://arxiv.org/abs/2501.09747)
- [LAPA](https://arxiv.org/abs/2410.11758)
- [Open-X-Embodiment](https://arxiv.org/abs/2310.08864)
- [OpenVLA](https://arxiv.org/abs/2406.09246)

Understanding these topics also requires a great deal of foundational knowledge, including diffusion models, Transformers, and VLM architectures.

Some knowledge of robotics is also valuable.

Studying GR00T N1 changed how I see physical AI. Neither physical AI nor VLA can be contained within a single AI discipline. Understanding these systems requires connecting computer vision, language modeling, generative modeling, control, and robotics.

That breadth is exactly what attracts me to the field. Physical AI continually pushes me to expand my understanding of AI as a whole and then apply that knowledge to systems that perceive, reason, and act in the physical world. For me, its interdisciplinary nature is not merely a challenge; it is the reason the field is so compelling.
