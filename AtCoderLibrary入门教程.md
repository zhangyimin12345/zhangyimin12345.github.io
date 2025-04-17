## 简介

AtCoder Library 是 AtCoder 官方对于算法竞赛中常见的一些模板进行编写，整合成了一个库。在参与 AtCoder 的比赛时可以直接使用（当然在其他 OJ 上也可以用，只不过你需要手动将文件里代码粘贴到你的代码前端）。

以下我们只介绍 C++ 中的 AtCoder Library，python 玩家请自行去网上查阅资料。

下文中所有代码都可以通过编译（编译器：`G++ 9.3.0`；编译选项：`-static -std=c++14 -Wall -Wl,--stack=1024000000`；操作系统：Windows 10）。

官方有入门文档，但是只有日文和英文版本的，于是在此写一篇中文的介绍。

请确保你的编译器版本支持 C++14 标准。

## 配置

这里给出两个下载地址：[AtCoder 官方](https://img.atcoder.jp/practice2/ac-library.zip) $\mid$ [AtCoder - Github](https://github.com/atcoder/ac-library)（建议使用第一个链接）。下过来解压，会发现有一个 python 文件，不用管。C++ 的引用都在 `/atcoder` 文件夹里，你可以把这个文件夹拖到编译器的 `/include` 目录下，这样以后在写代码的时候就可以直接 `#include <atcoder/all>` 来引入了。

注意，封装的所有功能和类都在 `namespace atcoder` 中。如果你懒得写 `atcoder::` 请记得 `using namespace atcoder;`。

## 使用

AtCoder Library 总共有 $11$ 个小的功能集合，分别封装了树状数组，线段树，带标记的线段树，SCC 相关，字符串相关，取模意义下的整数，并查集，最大/最小流，卷积，数学相关，2-SAT。

下面会选一些有用的介绍。

### 树状数组

Note：感觉不如手写。没有线性建树的功能，差评。

你可以通过 `fenwick_tree <T> tr(int n);` 来创建一个长度为 $n$ 的树状数组。**下标从 $0$ 开始，初值全为 $0$，`T` 为任意整型。**

支持单点加：`void tr.add(int x, T d);` 需要保证 $0\le x < n$ 否则行为未定义。

支持区间查：`T tr.sum(int l, int r);` 需要保证 $0\le l \le r < n$ 否则行为未定义。

以上操作时间复杂度显然均为 $O(\log n)$。

### 并查集

Note：好用的，$\alpha(n)$ 的复杂度，比 $\log n$ 确实要快些。

你可以通过 `dsu d(int n)` 来创建一个 $n$ 个节点，名为 `d` 的并查集，下标从 $0$ 开始，时间复杂度 $\Theta(n)$。

```cpp
int d.merge(int a, int b); // 加入一条边 (a, b) 并返回合并后联通块的 father
bool d.same(int a, int b); // 判断 (a, b) 是否在同一连通块
int d.leader(int a); // 找出祖先（有路径压缩）
int d.size(int a); // 给出 a 联通块的大小
```

以上操作都有 $O(\alpha(n))$ 的时间复杂度，同时均需要保证 $0\le a,b < n$。

我们还有：

```cpp
vector <vector <int> > d.groups();
```

上面的函数可以返回分组后的编号，时间复杂度 $O(n)$。


### 字符串相关

#### 求 LCP

```cpp
vector,<int> lcp_array,(string s, vector <int> sa);
vector <int> lcp_array <T> (vector <T> s, vector <int> sa);
```

返回的 `vector` 中，第 $i(0\le i < n)$ 个元素代表 $\vert \text{LCP}(s[s_{sa_i}, s_{sa_i + 1}, \ldots, n), s[s_{sa_{i + 1}}, s_{sa_{i + 1} + 1}, \ldots, n)) \vert$。

其中传入的 `vector <int> sa` 必须是 $s$ 的后缀数组。

时间复杂度 $\Theta(n)$，`T` 可以是任意整型。

特别地，$1\le n\le 10^8$。

#### 求后缀数组

```cpp
vector <int> suffix_array (string s);
vector <int> suffix_array <T> (vector <T> s);
```

前者时间复杂度 $\Theta(n)$；后者 T 为任意整型，时间复杂度 $\Theta(n\log M)$，$M$ 为值域。

特别地，$1\le n\le 10^8$。

#### 求 [Z 函数](https://oi-wiki.org/string/z-func/)

```cpp
vector <int> z_algorithm (string s);
vector <int> z_algorithm <T> (vector <T> s)

```

前者时间复杂度 $\Theta(n)$；后者 T 为任意整型，时间复杂度 $\Theta(n\log M)$，$M$ 为值域。

特别地，$1\le n\le 10^8$。


### 取模意义下的整数

分为两种，分别是 `static_modint` 和 `dynamic_modint`。

以下是 `static_modint` 的原型。

```cpp
template <int m, std::enable_if_t<1 <= m,
    void> *<unnamed> = nullptr> static_modint;
```

`static_modint` 的模数是不能改变的，四则运算都有重载（当然除法需要保证存在逆元）。`static_modint` 在与常规的整型运算时会强制转化导致取模过多效率变慢，可以考虑使用 `static_modint <m>:: raw(int x)` 来直接转化避免取模，但是要注意需要保证 $0 \le x < m$，否则这是一个 UB。

你可以通过 `static_modint <m> x.pow(long long n)` 来计算 $x^n \pmod m$（快速幂实现）。

你可以通过 `int x.val()` 来转换类型。

`dynamic_modint` 的用法大致与 `static_modint` 相同，但是多了一个动态设置模数的函数 `.set_mod(int m)`，感觉并没有什么用，不详细讲了。

### 线段树

事实上，它能干的下面的都能干。至于功能看完下面的想必也会懂的，因此这里只给一个原型，具体内容参见“**带懒标记的线段树**”：

```cpp
segtree <S, op, e> seg (int n);
segtree <S, op, e> seg (vector <S> v);
```

### 带懒标记的线段树

Note：重型武器。使用了非递归写法，空间时间常数都很小。

你可以通过以下两种方式 $O(n)$ 地构造一棵线段树（下标从 $0$ 开始）：

```cpp
lazy_segtree <S, op, e, F, mapping, composition, id> seg (int n);
lazy_segtree <S, op, e, F, mapping, composition, id> seg (vector<S> v);
```

下面逐一讲解这些模板类里面的东西。

- `S` 是一个结构体，包含了所有你的标记和答案所维护的信息，常见的有区间长度和区间权值之类的东西。
- `op` 是一个函数 `S op(S x, S y)`，等价于手写时的 `push_up` 函数，即合并答案的过程。
- `e` 是 `S` 的单位元，即使得 `op(e, x) == x` 的一个变量。
- `F` 是一个类型，包含你在修改时加入的信息（标记信息）。
- `mapping` 是一个函数，`S mapping(F x, S y)` 用于把 $x$ 合并到 $y$。
- `composition` 是一个函数，`F composition(F x, F y)` 用于 $x$ 合并 $y$，即两个标记的合并。
- `id` 是 `F` 的单位元，即使得 `composition(id, x) == x` 的一个 `F` 类型的变量。

然后有以下函数：

- `void seg.set(int p, S x)`：单点修。
- `S seg.get(int p)`：单点查。
- `S seg.prod(int l, int r)`：区间查。
- `S seg.all_prod()` 直接查 $[0, n)$ 的信息，$O(1)$。
- `void seg.apply(int p, F f)`：单点加。
- `void seg.apply(int l, int r, F f)`：区间加。

还有很多神秘的线段树上二分操作，有兴趣的读者请自行搜索。

下面给出了一个使用 `Atcoder Library Seg` 实现的区间加区间查询线段树，作为参考。

```cpp
#include <bits/stdc++.h>
#include <atcoder/lazysegtree>
using namespace std;
using i64 = long long;
struct tag {
    i64 sum; int len;
    tag(i64 x = 0, int y = 1) {sum = x; len = y;}
};
tag mapping(i64 f, tag s) {return tag(s.sum + f * s.len, s.len);}
tag mergetag(tag x, tag y) {return tag(x.sum + y.sum, x.len + y.len);}
tag nom(){return tag(0, 1);} i64 p() {return 0;}
i64 mergef(i64 x, i64 y) {return x + y;}
int main() {
    cin.tie(NULL) -> sync_with_stdio(false);
    int n, m;
    cin >> n >> m;
    vector <tag> a(n, tag());
    for (auto & p : a) cin >> p.sum;
    atcoder::lazy_segtree <tag, mergetag, nom,
    i64, mapping, mergef, p> segtree(a);
    for (int i = 1; i <= m; i ++) {
        int op, x, y; i64 z;
        cin >> op >> x >> y;
        if (op == 2) cout << segtree.prod(x - 1, y).sum << '\n';
        else cin >> z, segtree.apply(x - 1, y, z);
    }
    return 0;
}
```

这个可以极大地减少码量。

### 卷积

头文件：`#include <atcoder/convolution>`

函数原型：

```cpp
template <unsigned int mod = 998244353,
          class T,
          std::enable_if_t<internal::is_integral<T>::value>* = nullptr>
std::vector<T> convolution(const std::vector<T>& a, const std::vector<T>& b);

std::vector<long long> convolution_ll(const std::vector<long long>& a,
                                      const std::vector<long long>& b);
```

两个函数均用于计算 $(+,\times)$ 卷积。即 $f_i = \sum_{j = 0}^{i}a_jb_{i - j}$。

对于前者，其中的类型 `T` 可以是任意具有整型性质的类，包括之前提到的 `modint`，`mod` 就是模数。该函数基于 NTT 实现，时间复杂度 $\mathcal{O}(n\log n)$，当然，模数也必须满足 NTT 对于模数的限制。具体的可以参考 [OI-wiki:NTT](https://oi-wiki.org/math/poly/ntt/)。

对于后者你需要保证结果在 `long long` 范围内。

### 数学相关

有 ExCRT，快速幂，逆元之类的东西，类欧，用处不大。简单介绍一下 ExCRT。

```cpp
typedef ll long long;
pair <ll, ll> crt (vector <ll> r, vector <ll> m)
```

返回的 `pair` 若为 $(0, 0)$ 则无解，否则返回 $(p, q)$，$p$ 代表最小的解，$q$ 代表模数。形式化地，所有解都满足 $x\equiv p\pmod q$。

## 后记

在打 `atcoder` 的时候，这些库确实能够减少码量，但是不能忘了常数和调试困难。要避免对其的依赖。

~~也感谢不知道是哪篇题解让我知道了在 C++ 里原来也能用 ACL。~~

如果觉得写的不错的话，能给个赞吗 qwq。

感谢管理大大的审核，咕咕咕。
