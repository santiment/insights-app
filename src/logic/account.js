import { Subject, from, interval } from 'rxjs'
import { take, takeUntil, mergeMap, switchMap, filter } from 'rxjs/operators'
import { client } from '@/apollo'
import { REMOVE_CONNECTED_WALLET_QUERY } from '@/gql/user'

const test = new Subject()

export const removeAddress$ = test.pipe(
  switchMap(address =>
    from(
      client
        .mutate({
          mutation: REMOVE_CONNECTED_WALLET_QUERY,
          variables: {
            address,
          },
        })
        .then(
          ({ data: { removeUserEthAddress } }) =>
            removeUserEthAddress.ethAccounts,
        )
        .catch(console.warn),
    ),
  ),
)

/* removeAddress$.subscribe(console.log, console.warn) */

export const removeConnectedAddress = address => {
  test.next(address)
}

const numbers = interval(1000)

/* numbers.pipe(takeUntil(removeAddress$)).subscribe(console.log) */
