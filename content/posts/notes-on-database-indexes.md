---
title: "[Sample] Notes on database indexes: start with the query"
description: A practical mental model for choosing indexes without turning every table into a guessing game.
date: 2026-06-28
category: Backend
subcategory: Databases
tags:
  - PostgreSQL
  - Performance
---

Indexes are most useful when they begin with a concrete access pattern. Before adding one, write down the query, the expected result size, and how often it runs.

## Start with the query

An index is not an abstract improvement to a table. It is a data structure that helps a specific family of reads while adding cost to writes and storage.

## Check the plan

Use the database's query planner to test the assumption. The useful question is not whether an index exists, but whether the planner can use it to avoid unnecessary work.

## Keep the feedback loop short

Measure again with representative data. A compact cycle of hypothesis, plan inspection, and measurement is more reliable than adding indexes from intuition alone.
