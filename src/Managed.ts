import { IO, io } from 'fp-ts/lib/IO'
import { pipeable } from 'fp-ts/lib/pipeable'
import { identity } from 'fp-ts/lib/function'
import { getContM } from 'fp-ts-cont/lib/ContT'
import { MonadCont2 } from 'fp-ts-cont/lib/MonadCont'
import { Monad2 } from 'fp-ts/lib/Monad'
import { MonadManaged2 } from './MonadManaged'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Apply3, Apply2, Apply2C, Apply1, Apply } from 'fp-ts/lib/Apply'
import { URIS, URIS3, Kind3, URIS2, Kind2, Kind, HKT } from 'fp-ts/lib/HKT'
import { Newtype, iso } from 'newtype-ts'

/**
 * Here, `Managed` is implemented in terms of `ContT`,
 * like: `newtype Managed a = ContT r IO a`
 *
 * However, it could instead be implemented in terms of `Codensity`,
 * like: `newtype Managed a = Codensity IO a`
 *
 */
const T = getContM(io)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    Managed: Managed<E, A>
  }
}

/**
 * @since 0.0.1
 */
export const URI = 'Managed'

/**
 * @since 0.0.1
 */
export type URI = typeof URI

/**
 * @since 0.0.1
 */
export interface ManagedF<R, A> {
  (f: (a: A) => IO<R>): IO<R>
}

/**
 * @since 0.0.1
 */
export interface Managed<R, A>
  extends Newtype<{ readonly Managed: unique symbol }, ManagedF<R, A>> {}

/**
 * @since 0.0.1
 */
export const of: <R, A>(a: A) => Managed<R, A> = <R, A>(a: A) =>
  iso<Managed<R, A>>().wrap(T.of(a))

/**
 * @since 0.0.1
 */
export const callCC = <R, A>(
  f: (g: <B>(a: A) => Managed<R, B>) => Managed<R, A>,
): Managed<R, A> => {
  const isoMa = iso<Managed<R, A>>()
  return isoMa.wrap(k => {
    const ma = f(<B>(a: A) => {
      const isoMb = iso<Managed<R, B>>()
      return isoMb.wrap(() => k(a))
    })
    return isoMa.unwrap(ma)(k)
  })
}

/**
 * @since 0.0.1
 */
export const fromIO: <R, A>(fa: IO<A>) => Managed<R, A> = fa => of(fa())

/**
 * @since 0.0.1
 */
export const using: <R, A>(ma: Managed<R, A>) => Managed<R, A> = identity

/**
 * @since 0.0.1
 *
 * Managed constructor
 * Wraps `(a: A) => IO<R>) => IO<R>` as `Managed<R, A>` newtype
 *
 */
export const mkManaged = <R, A>(
  ma: (f: (a: A) => IO<R>) => IO<R>,
): Managed<R, A> => iso<Managed<R, A>>().wrap(ma)

/**
 * @since 0.0.1
 *
 * Named `with_` because `with` is a reserved keyword
 *
 * Unwraps `Managed<R, A>` newtype into `(a: A) => IO<R>) => IO<R>`
 */
export const with_: <R, A>(
  ma: Managed<R, A>,
) => (f: (a: A) => IO<R>) => IO<R> = <R, A>(ma: Managed<R, A>) =>
  iso<Managed<R, A>>().unwrap(ma)

/**
 * @since 0.0.1
 *
 * Alias of `with_`
 *
 */
export const unManaged = with_

/**
 * @since 0.0.1
 */
export const runManaged = <A>(ma: Managed<void, A>): IO<void> =>
  iso<Managed<void, A>>().unwrap(ma)(io.of)

// utlity type alias used below
type Curried2<A, B, C> = (a: A) => (b: B) => C

// utility function used below
function liftA2<F extends URIS3>(
  F: Apply3<F>,
): <A, B, C>(
  f: Curried2<A, B, C>,
) => <U, L>(
  fa: Kind3<F, U, L, A>,
) => (fb: Kind3<F, U, L, B>) => Kind3<F, U, L, C>
function liftA2<F extends URIS2>(
  F: Apply2<F>,
): <A, B, C>(
  f: Curried2<A, B, C>,
) => <L>(fa: Kind2<F, L, A>) => (fb: Kind2<F, L, B>) => Kind2<F, L, C>
function liftA2<F extends URIS2, L>(
  F: Apply2C<F, L>,
): <A, B, C>(
  f: Curried2<A, B, C>,
) => (fa: Kind2<F, L, A>) => (fb: Kind2<F, L, B>) => Kind2<F, L, C>
function liftA2<F extends URIS>(
  F: Apply1<F>,
): <A, B, C>(
  f: Curried2<A, B, C>,
) => Curried2<Kind<F, A>, Kind<F, B>, Kind<F, C>>
function liftA2<F>(
  F: Apply<F>,
): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
function liftA2<F>(
  F: Apply<F>,
): <A, B, C>(
  f: Curried2<A, B, C>,
) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>> {
  return f => fa => fb => F.ap(F.map(fa, f), fb)
}

/**
 * @since 0.0.1
 */
export function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Managed<R, A>> {
  return {
    concat: (x, y) => liftA2(managed)((a: A) => (b: A) => S.concat(a, b))(x)(y),
  }
}

/**
 * @since 0.0.1
 */
export function getMonoid<R, A>(M: Monoid<A>): Monoid<Managed<R, A>> {
  return {
    concat: getSemigroup<R, A>(M).concat,
    empty: of(M.empty),
  }
}

/**
 * @since 0.0.1
 */
export const managed: Monad2<URI> & MonadManaged2<URI> & MonadCont2<URI> = {
  URI,
  of,
  /* equivalent to: unsafeCoerce<typeof T.ap, Monad2<URI>['ap']>(T.ap) */
  ap: <R, A, B>(
    _mf: Managed<R, (a: A) => B>,
    _ma: Managed<R, A>,
  ): Managed<R, B> => {
    const isoMf = iso<Managed<R, (a: A) => B>>()
    const isoMa = iso<Managed<R, A>>()
    const isoMb = iso<Managed<R, B>>()
    const mf = isoMf.unwrap(_mf)
    const ma = isoMa.unwrap(_ma)
    return isoMb.wrap(k => mf(f => ma(a => k(f(a)))))
  },
  /* equivalent to: unsafeCoerce<typeof T.map, Monad2<URI>['map']>(T.map) */
  map: <R, A, B>(_ma: Managed<R, A>, f: (a: A) => B): Managed<R, B> => {
    const isoMa = iso<Managed<R, A>>()
    const isoMb = iso<Managed<R, B>>()
    const ma = isoMa.unwrap(_ma)
    return isoMb.wrap(k => ma(a => k(f(a))))
  },
  /* equivalent to: unsafeCoerce<typeof T.chain, Monad2<URI>['chain']>(T.chain) */
  chain: <R, A, B>(
    _ma: Managed<R, A>,
    f: (a: A) => Managed<R, B>,
  ): Managed<R, B> => {
    const isoMa = iso<Managed<R, A>>()
    const isoMb = iso<Managed<R, B>>()
    const ma = isoMa.unwrap(_ma)
    return isoMb.wrap(k => ma(a => isoMb.unwrap(f(a))(k)))
  },
  /* equivalent to: unsafeCoerce<typeof T.callCC, MonadCont2<URI>['callCC']>(T.callCC) */
  callCC,
  fromIO,
  using,
}

/**
 * @since 0.0.1
 */
export const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
} = pipeable(managed)
