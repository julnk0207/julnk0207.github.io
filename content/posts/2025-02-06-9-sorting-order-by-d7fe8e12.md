---
title: "[SQL First Step] 9. Sorting - ORDER BY"
description: "When you want to sort the result, use ORDER BY."
date: 2025-02-06
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

## `ORDER BY` to Sort

When you want to sort the result, use `ORDER BY`.

```sql
SELECT col FROM table_name WHERE condition ORDER BY col
```

`WHERE` phrase can be omitted it it is not needed.

```sql
mysql> SELECT * FROM sample31;
+------+------+---------------------------+
| name | age  | address                   |
+------+------+---------------------------+
| A씨  |   36 | 대구광역시 중구           |
| B씨  |   18 | 부산광역시 연제구         |
| C씨  |   25 | 서울특별시 중구           |
+------+------+---------------------------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM sample31 ORDER BY age;
+------+------+---------------------------+
| name | age  | address                   |
+------+------+---------------------------+
| B씨  |   18 | 부산광역시 연제구         |
| C씨  |   25 | 서울특별시 중구           |
| A씨  |   36 | 대구광역시 중구           |
+------+------+---------------------------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM sample31 ORDER BY address;
+------+------+---------------------------+
| name | age  | address                   |
+------+------+---------------------------+
| A씨  |   36 | 대구광역시 중구           |
| B씨  |   18 | 부산광역시 연제구         |
| C씨  |   25 | 서울특별시 중구           |
+------+------+---------------------------+
3 rows in set (0.00 sec)
```

The basic criteria of alignment is ascendant. If you want to sort in descending order, add `DESC` at the end of the command.

```sql
mysql> SELECT * FROM sample31 ORDER BY age DESC;
+------+------+---------------------------+
| name | age  | address                   |
+------+------+---------------------------+
| A씨  |   36 | 대구광역시 중구           |
| C씨  |   25 | 서울특별시 중구           |
| B씨  |   18 | 부산광역시 연제구         |
+------+------+---------------------------+
3 rows in set (0.00 sec)
```

## Criteria of Sorting

- Numeric value: Follow relationship between small and large.
- Date and time: More recent date(time) is considered larger.
- Text: Lexicographic(dictionary) order.

If sorting does not work as intended, check the datatype. If numeric value is stored in text type, sorting result could be different.

All command using `SELECT` (including sorting), does not affect the original database.

*All images, except those with separate source indications, are excerpted from lecture materials.*
