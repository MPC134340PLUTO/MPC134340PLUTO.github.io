---
layout: ../../../layouts/ArchiveArticle.astro
title: "二分答案：从单调性到边界"
category: algorithm
description: "以 C++ 为例，说明二分答案的单调性、边界和检查函数。"
tags: ["C++", "二分", "算法"]
sample: true
---

> 本文是用于验证知识档案功能的示例学习指南，并非个人已完成的学习或实验记录。

## 什么时候可以二分答案？

当候选答案具有单调可行性时，可以通过检查函数 `check(x)` 判断某个答案是否可行。比如，若某个上界可行，则更大的上界也可行，就可以寻找最小可行值。

## 最小可行值模板

假设 `lo <= hi`，且已知 `hi` 可行，下面的写法返回最小可行值。

```cpp
long long first_true(long long lo, long long hi) {
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (check(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
```

这里假设 `hi - lo` 不会溢出，`check` 由具体题目实现。若上界不保证可行，应提前判断无解情况。

## 检查清单

- 证明单调性，而不是仅凭样例判断。
- 确定搜索区间和无解条件。
- 单独验证 `check` 的正确性与复杂度。
- 测试只有一个候选值、最小值可行、最大值才可行等边界。
