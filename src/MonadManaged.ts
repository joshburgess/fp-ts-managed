import { HKT2, Kind2, Kind3, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { MonadIO, MonadIO2, MonadIO2C, MonadIO3 } from 'fp-ts/lib/MonadIO'
import { Managed } from './Managed'

/**
 * @since 0.0.1
 */
export interface MonadManaged<M> extends MonadIO<M> {
  readonly using: <E, A>(ma: Managed<E, A>) => HKT2<M, E, A>
}

/**
 * @since 0.0.1
 */
export interface MonadManaged2<M extends URIS2> extends MonadIO2<M> {
  readonly using: <E, A>(ma: Managed<E, A>) => Kind2<M, E, A>
}

/**
 * @since 0.0.1
 */
export interface MonadManaged2C<M extends URIS2, E> extends MonadIO2C<M, E> {
  readonly using: <A>(ma: Managed<E, A>) => Kind2<M, E, A>
}

/**
 * @since 0.0.1
 */
export interface MonadManaged3<M extends URIS3> extends MonadIO3<M> {
  readonly using: <R, E, A>(ma: Managed<E, A>) => Kind3<M, R, E, A>
}
