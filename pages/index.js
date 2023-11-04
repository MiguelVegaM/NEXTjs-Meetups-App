import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "Meetup #1",
//     image: "../SCR-20231003-ivem.jpg",
//     address: "Hola 1, Col. Bombas CP 291927",
//     description: "Meetup número 1",
//   },
//   {
//     id: "m2",
//     title: "Meetup #2",
//     image: "../SCR-20231003-ivem.jpg",
//     address: "Hola 2, Col. Bombas CP 291927",
//     description: "Meetup número 2",
//   },
//   {
//     id: "m3",
//     title: "Meetup #3",
//     image: "../SCR-20231003-ivem.jpg",
//     address: "Hola 3, Col. Bombas CP 291927",
//     description: "Meetup número 3",
//   },
// ];

const HomePage = (props) => {
  //fetch data form an API
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="All your meetups in one place" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data form an API

  const client = await MongoClient.connect(
    "mongodb+srv://mkevga:mongodbpass1@cluster0.jkhmrvx.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
