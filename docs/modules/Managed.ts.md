---
title: Managed.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Managed (interface)](#managed-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [callCC (constant)](#callcc-constant)
- [managed (constant)](#managed-constant)
- [mkManaged (constant)](#mkmanaged-constant)
- [of (constant)](#of-constant)
- [using (constant)](#using-constant)
- [with\_ (constant)](#with_-constant)
- [{](#)
- [fromIO (function)](#fromio-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [runManaged (function)](#runmanaged-function)

---

# Managed (interface)

**Signature**

```ts
export interface Managed<R, A> {
  (f: (a: A) => IO<R>): IO<R>
}
```

Added in v0.0.1

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.0.1

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v0.0.1

# callCC (constant)

**Signature**

```ts
export const callCC: <R, A>(
  f: (g: <B>(a: A) => Managed<R, B>) => Managed<R, A>,
) => Managed<R, A> = ...
```

Added in v0.0.1

# managed (constant)

**Signature**

```ts
export const managed: Monad2<URI> & MonadManaged2<URI> & MonadCont2<URI> = ...
```

Added in v0.0.1

# mkManaged (constant)

**Signature**

```ts
export const mkManaged: <R, A>(
  ma: (f: (a: A) => IO<R>) => IO<R>,
) => Managed<R, A> = ...
```

Added in v0.0.1

# of (constant)

**Signature**

```ts
export const of: <R, A>(a: A) => Managed<R, A> = ...
```

Added in v0.0.1

# using (constant)

**Signature**

```ts
export const using: <R, A>(ma: Managed<R, A>) => Managed<R, A> = ...
```

Added in v0.0.1

# with\_ (constant)

**Signature**

```ts
export const with_: <E, A>(
  ma: Managed<E, A>,
) => (f: (a: A) => IO<E>) => IO<E> = ...
```

Added in v0.0.1

# {

ap,
apFirst,
apSecond,
chain,
chainFirst,
flatten,
map,
} (constant)

**Signature**

```ts
export const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
} = ...
```

Added in v0.0.1

# fromIO (function)

**Signature**

```ts
export const fromIO: <R, A>(fa: IO<A>) => Managed<R, A> = fa => ...
```

Added in v0.0.1

# getMonoid (function)

**Signature**

```ts
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Managed<R, A>> { ... }
```

Added in v0.0.1

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Managed<R, A>> { ... }
```

Added in v0.0.1

# runManaged (function)

**Signature**

```ts
export const runManaged = <E>(ma: Managed<void, E>): IO<void> => ...
```
