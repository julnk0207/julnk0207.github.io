---
title: "[SQL First Step] 10. Sorting by Specifying Multiple Columns"
description: "To use multiple columns for sorting, write multiple columns next to the ORDER BY, separating with commas."
date: 2025-02-07
category: "Book"
subcategory: "SQL First Step"
tags:
  - "SQL First Step"
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

## Sorting by Specifying Multiple Columns

To use multiple columns for sorting, write multiple columns next to the `ORDER BY`, separating with commas.

```sql
SELECT col FROM table_name WHERE conditions ORDER BY col1 [ASC], col2 [DESC];
```

See the following examples.

```sql
mysql> SELECT * FROM sample32;
+------+------+
| a    | b    |
+------+------+
|    1 |    1 |
|    2 |    1 |
|    2 |    2 |
|    1 |    3 |
|    1 |    2 |
+------+------+
5 rows in set (0.00 sec)

mysql> SELECT * FROM sample32 ORDER BY a, b;
+------+------+
| a    | b    |
+------+------+
|    1 |    1 |
|    1 |    2 |
|    1 |    3 |
|    2 |    1 |
|    2 |    2 |
+------+------+
5 rows in set (0.00 sec)

mysql> SELECT * FROM sample32 ORDER BY a ASC, b DESC;
+------+------+
| a    | b    |
+------+------+
|    1 |    3 |
|    1 |    2 |
|    1 |    1 |
|    2 |    2 |
|    2 |    1 |
+------+------+
5 rows in set (0.00 sec)
```

If you don’t write `ASC` or `DESC`, the basic criteria will be `ASC`.

NULL value is special. As numerical comparison is impossible for NULL, NULL is considered as the largest or the smallest. However, there is no common standard and the rule is different across the products. In MySQL, NULL is considered as the smallest value.

*All images, except those with separate source indications, are excerpted from lecture materials.*
