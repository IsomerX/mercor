import { NextPage } from 'next';
import { api } from '~/utils/api';

const Schedule: NextPage<{}> = () => {
  const { data: userEvents } = api.user.getEnrolledEvents.useQuery(undefined, { refetchOnWindowFocus: false });
  return (
    <div>
      <h1>Schedule</h1>
      {
        userEvents ? userEvents.length
          ? userEvents.map((event) => <div key={event.id}>{event.name}</div>)
          : <>You have no events scheduled</>
          : <>Loading...</>
      }
    </div>
  );
}

export default Schedule;