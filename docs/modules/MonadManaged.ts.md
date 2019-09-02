---
title: MonadManaged.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [MonadManaged (interface)](#monadmanaged-interface)
- [MonadManaged2 (interface)](#monadmanaged2-interface)
- [MonadManaged2C (interface)](#monadmanaged2c-interface)
- [MonadManaged3 (interface)](#monadmanaged3-interface)

---

# MonadManaged (interface)

**Signature**

```ts
export interface MonadManaged<M> extends MonadIO<M> {
  readonly using: <E, A>(ma: Managed<E, A>) => HKT2<M, E, A>
}
```

Added in v0.0.1

# MonadManaged2 (interface)

**Signature**

```ts
export interface MonadManaged2<M extends URIS2> extends MonadIO2<M> {
  readonly using: <E, A>(ma: Managed<E, A>) => Kind2<M, E, A>
}
```

Added in v0.0.1

# MonadManaged2C (interface)

**Signature**

```ts
export interface MonadManaged2C<M extends URIS2, E> extends MonadIO2C<M, E> {
  readonly using: <A>(ma: Managed<E, A>) => Kind2<M, E, A>
}
```

Added in v0.0.1

# MonadManaged3 (interface)

**Signature**

```ts
export interface MonadManaged3<M extends URIS3> extends MonadIO3<M> {
  readonly using: <R, E, A>(ma: Managed<E, A>) => Kind3<M, R, E, A>
}
```

Added in v0.0.1
