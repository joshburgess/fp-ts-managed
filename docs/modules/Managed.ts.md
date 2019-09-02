---
title: Managed.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Managed (interface)](#managed-interface)
- [ManagedF (interface)](#managedf-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [managed (constant)](#managed-constant)
- [unManaged (constant)](#unmanaged-constant)
- [using (constant)](#using-constant)
- [{](#)
- [callCC (function)](#callcc-function)
- [fromIO (function)](#fromio-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [mkManaged (function)](#mkmanaged-function)
- [of (function)](#of-function)
- [runManaged (function)](#runmanaged-function)
- [with\_ (function)](#with_-function)

---

# Managed (interface)

**Signature**

```ts
export interface Managed<R, A> extends Newtype<{ readonly Managed: unique symbol }, ManagedF<R, A>> {}
```

Added in v0.0.1

# ManagedF (interface)

**Signature**

```ts
export interface ManagedF<R, A> {
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

# managed (constant)

**Signature**

```ts
export const managed: Monad2<URI> & MonadManaged2<URI> & MonadCont2<URI> = ...
```

Added in v0.0.1

# unManaged (constant)

**Signature**

```ts
export const unManaged = ...
```

Added in v0.0.1

Alias of `with_`

# using (constant)

**Signature**

```ts
export const using: <R, A>(ma: Managed<R, A>) => Managed<R, A> = ...
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

# callCC (function)

**Signature**

```ts
export const callCC = <R, A>(
  f: (g: <B>(a: A) => Managed<R, B>) => Managed<R, A>,
): Managed<R, A> => ...
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

# mkManaged (function)

**Signature**

```ts
export const mkManaged = <R, A>(
  ma: (f: (a: A) => IO<R>) => IO<R>,
): Managed<R, A> => ...
```

Added in v0.0.1

Managed constructor
Wraps `(a: A) => IO<R>) => IO<R>` as `Managed<R, A>` newtype

# of (function)

**Signature**

```ts
export const of: <R, A>(a: A) => Managed<R, A> = <R, A>(a: A) => ...
```

Added in v0.0.1

# runManaged (function)

**Signature**

```ts
export const runManaged = <A>(ma: Managed<void, A>): IO<void> => ...
```

# with\_ (function)

**Signature**

```ts
export const with_: <R, A>(
  ma: Managed<R, A>,
) => (f: (a: A) => IO<R>) => IO<R> = <R, A>(ma: Managed<R, A>) => ...
```

Added in v0.0.1

Named `with_` because `with` is a reserved keyword

Unwraps `Managed<R, A>` newtype into `(a: A) => IO<R>) => IO<R>`
