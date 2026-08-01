---
title: "[SQL First Step] 19. Hard Delete and Soft Delete"
description: "Hard delete means actually removing data. It is consistent with our general sense. If you delete data with DELETE, the data will be removed in the database."
date: 2025-02-11
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

## Hard Delete

Hard delete means actually removing data. It is consistent with our general sense. If you delete data with `DELETE`, the data will be removed in the database.

## Soft Delete

Soft delete does not actually remove data. To do soft delete, make deletion flag first in the database. The column represents whether the row is deleted or not. If you delete the row(using `UPDATE` to change the state of the deletion flag), the only thing changes is the state of deletion flag. Data still exists.

## When to Use Hard or Soft Delete?

The situation to use hard or soft delete is different.

- Hard Delete
    - Secure storage by deleting data.
    - Prevent privacy leakage after withdrawing membership.
- Soft Delete
    - Easy to restore previous state.

*All images, except those with separate source indications, are excerpted from lecture materials.*
