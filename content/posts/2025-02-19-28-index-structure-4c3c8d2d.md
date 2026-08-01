---
title: "[SQL First Step] 28. Index Structure"
description: "Index is a separate database object which stores keywords(for searching) and position of rows. Index makes searching easy, which is similar to that of a book."
date: 2025-02-19
category: "Book"
subcategory: "SQL First Step"
tags:
  - "SQL First Step"
  - "Database"
  - "SQL"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## Index

Index is a separate database object which stores keywords(for searching) and position of rows. Index makes searching easy, which is similar to that of a book.

Although index is a separate database, it depends on the original table. Therefore, in most cases, deleting table also removes index database.

## Binary Tree

When searching, looking at all rows is inefficient(full table scan). Therefore, if a set is sorted, it is even better to use binary search.

Binary search decreases the size of searching area into half for each step. First, compare the center value and the target. If the center value is bigger than target, do the same step in the set which only consists of values smaller than center one. If the center value is smaller than target, the other side will be a next searching area.

Reference: GeeksforGeeks

However, it is difficult to always sort the index. Binary tree solves the problem. Index is usually stored in binary tree structure.

In binary tree, storing and searching value starts at the root node. Basic rule is very simple. Go left side if the value is smaller than the node. Go right in the other case.

For more information, see [here](https://hyun3246.github.io/computer%20science/MIT-%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EC%9D%98-%EC%9D%B4%ED%95%B4-5.-%EC%9D%BC%EC%A0%95-%EC%98%88%EC%95%BD%EA%B3%BC-%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-%ED%8A%B8%EB%A6%AC/).

Reference: GeeksforGeeks

> It is impossible to store same value in binary tree used in index database.
> 

*All images, except those with separate source indications, are excerpted from lecture materials.*
