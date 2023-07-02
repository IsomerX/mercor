import { NextPage } from 'next';
import { api } from '~/utils/api';

const Schedule: NextPage<{}> = () => {
  const { data: userEvents } = api.user.getUserEvents.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <div>
      <h1>Schedule</h1>
      {
        userEvents ? userEvents.enrolledEvents.length > 0
          ? userEvents.enrolledEvents.map((enrolledEvent) => <div key={enrolledEvent.id}>{enrolledEvent.event.name}</div>)
          : <>You have no enrolled events scheduled</>
          : <>Loading...</>
      }

      <h2>Events you are hosting</h2>
      {
        userEvents ? userEvents.organizes.length > 0
          ? userEvents.organizes.map((event) => <div key={event.id}>{event.name}</div>)
          : <>You are not hosting any events</>
          : <>Loading...</>
      }
    </div>
  );
}

export default Schedule;