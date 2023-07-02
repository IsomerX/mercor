import { NextPage } from 'next';
import Link from 'next/link';
import { api } from '~/utils/api';

const Schedule: NextPage<{}> = () => {
  const { data: userEvents, isLoading } = api.user.getUserEvents.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <div>
      <h1>Schedule</h1>
      {
        !isLoading && userEvents ? userEvents.enrolledEvents.length > 0
          ? userEvents.enrolledEvents.map((enrolledEvent) => (
            <Link href={`/room/${ enrolledEvent.event.id }`} key={enrolledEvent.id}>
              <div>{enrolledEvent.event.name}</div>
            </Link>
          ))
          : <>You have no enrolled events scheduled</>
          : <>Loading...</>
      }

      <h2>Events you are hosting</h2>
      {
        !isLoading && userEvents ? userEvents.organizes.length > 0
          ? userEvents.organizes.map((event) => <div key={event.id}>{event.name}</div>)
          : <>You are not hosting any events</>
          : <>Loading...</>
      }
    </div>
  );
}

export default Schedule;
