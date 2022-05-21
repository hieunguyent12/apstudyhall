import type { NextPage } from "next";

import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="mt-10">
      <p>
        Hi, welcome to AP Study Hall! 👋 This website contains all the
        information you need to prepare for the AP exams.
      </p>

      <br />

      <p>Above, you will see the AP Resources and Forum links.</p>

      <br />

      <p>
        The <span className="font-bold">AP Resources</span> page contains the
        information like study guides, video reviews, etc. for every AP classes.
      </p>

      <br />

      <p>
        The <span className="font-bold">Forum</span> page allows you to create
        posts and publish them so other people can see. You can post any
        AP-related questions or ideas that you have there.
      </p>
    </div>
  );
};

export default Home;
