import { Subject, from } from 'rxjs'
import { take, mergeMap, switchMap, filter } from 'rxjs/operators'
import { client } from '@/apollo'
import { USER_SETTINGS_TELEGRAM_QUERY } from '@/gql/user'

const acc = new Subject()

const acc$ = acc.pipe(
  switchMap(() =>
    from(
      client.watchQuery({
        query: USER_SETTINGS_TELEGRAM_QUERY,
        pollInterval: 3000,
      }),
    ),
  ),
  filter(
    ({ data: { currentUser } }) => currentUser.settings.hasTelegramConnected,
  ),
  take(1),
)

acc$.subscribe(data => console.log('123', data))

export const test = e => {
  acc.next(e)
}
