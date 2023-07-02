import { type NextPage } from "next";
import Nav from "~/components/Nav";
import Card from "~/components/Card";
import { api } from "~/utils/api";

const Discover: NextPage = () => {
  const { data: events, refetch } = api.event.getAllEvents.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const mutation = api.user.enrollUser.useMutation({ onSuccess: () => refetch() });
  return (
    <div className="relative ">
      <Nav />

      {
        /* <div className="absolute top-50 left-64 m-auto  rounded-full h-48 w-48 bg-[#212129]/40 filter blur-2xl mix-blend-multiply"> </div>
        <div className="absolute top-48 right-64 m-auto  rounded-full h-48 w-48 bg-[#212129]/40 filter blur-2xl mix-blend-multiply"> </div>
        <div className="absolute top-36 right-58 m-auto  rounded-full h-64 w-64 bg-[#323949] filter blur-2xl mix-blend-multiply"> </div>
        <div className="absolute top-50 left-64 m-auto  rounded-full h-48 w-48 bg-[#212129]/40 filter blur-2xl mix-blend-multiply"> </div> */
      }

      <div className="m-4">
        {events ? events.map((event) => <Card key={event.id} event={event} mutation={mutation} />) : <>Loading...</>}
      </div>
    </div>
  );
};

export default Discover;
