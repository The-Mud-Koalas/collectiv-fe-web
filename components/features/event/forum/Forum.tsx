import React from "react";
import ForumPost from "./ForumPost";

const Forum = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <ForumPost
        author="Rashad"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nobis delectus molestias harum aut deserunt corrupti eius, sit earum, dolor inventore quas voluptatum unde. Unde inventore cupiditate ex officia impedit.
        Aperiam mollitia sequi tenetur dolor voluptates a ipsum aut voluptas. Esse minima cupiditate, praesentium omnis asperiores rem. Vel eius, perferendis repellat quidem libero non. Cupiditate iusto placeat esse recusandae sed!
        Amet possimus esse necessitatibus, voluptatum velit iure iusto neque nihil sed voluptas ratione earum? Quod asperiores ea quia consequatur a qui consequuntur, maxime vel natus ut debitis! Fuga, commodi magnam.
        Ipsa expedita vero ab asperiores ratione quam saepe adipisci perspiciatis, est eaque corporis optio maiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        Provident ipsam delectus recusandae molestias veniam ullam, saepe accusamus nisi, labore culpa sequi odio, voluptatibus nulla suscipit nemo dolorum officia. Ratione dolorum ipsam, harum inventore nam ipsa ea aperiam quibusdam?"
        votes={30}
        isDownvotedByUser={false}
        isUpvotedByUser
      />
      <ForumPost
        author="Rashad"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nobis delectus molestias harum aut deserunt corrupti eius, sit earum, dolor inventore quas voluptatum unde. Unde inventore cupiditate ex officia impedit.
        Aperiam mollitia sequi tenetur dolor voluptates a ipsum aut voluptas. Esse minima cupiditate, praesentium omnis asperiores rem. Vel eius, perferendis repellat quidem libero non. Cupiditate iusto placeat esse recusandae sed!
        Amet possimus esse necessitatibus, voluptatum velit iure iusto neque nihil sed voluptas ratione earum? Quod asperiores ea quia consequatur a qui consequuntur, maxime vel natus ut debitis! Fuga, commodi magnam.
        Ipsa expedita vero ab asperiores ratione quam saepe adipisci perspiciatis, est eaque corporis optio maiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        Provident ipsam delectus recusandae molestias veniam ullam, saepe accusamus nisi, labore culpa sequi odio, voluptatibus nulla suscipit nemo dolorum officia. Ratione dolorum ipsam, harum inventore nam ipsa ea aperiam quibusdam?
        aiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        aiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        aiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?"
        votes={-69}
        isDownvotedByUser
        isUpvotedByUser={false}
      />
      <ForumPost
        author="Rashad"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nobis delectus molestias harum aut deserunt corrupti eius, sit earum, dolor inventore quas voluptatum unde. Unde inventore cupiditate ex officia impedit.
        Aperiam mollitia sequi tenetur dolor voluptates a ipsum aut voluptas. Esse minima cupiditate, praesentium omnis asperiores rem. Vel eius, perferendis repellat quidem libero non. Cupiditate iusto placeat esse recusandae sed!
        Amet possimus esse necessitatibus, voluptatum velit iure iusto neque nihil sed voluptas ratione earum? Quod asperiores ea quia consequatur a qui consequuntur, maxime vel natus ut debitis! Fuga, commodi magnam.
        Ipsa expedita vero ab asperiores ratione quam saepe adipisci perspiciatis, est eaque corporis optio maiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        Provident ipsam delectus recusandae molestias veniam ullam, saepe accusamus nisi, labore culpa sequi odio, voluptatibus nulla suscipit nemo dolorum officia. Ratione dolorum ipsam, harum inventore nam ipsa ea aperiam quibusdam?"
        votes={30}
        isDownvotedByUser
        isUpvotedByUser={false}
      />
      <ForumPost
        author="Rashad"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nobis delectus molestias harum aut deserunt corrupti eius, sit earum, dolor inventore quas voluptatum unde. Unde inventore cupiditate ex officia impedit.
        Aperiam mollitia sequi tenetur dolor voluptates a ipsum aut voluptas. Esse minima cupiditate, praesentium omnis asperiores rem. Vel eius, perferendis repellat quidem libero non. Cupiditate iusto placeat esse recusandae sed!
        Amet possimus esse necessitatibus, voluptatum velit iure iusto neque nihil sed voluptas ratione earum? Quod asperiores ea quia consequatur a qui consequuntur, maxime vel natus ut debitis! Fuga, commodi magnam.
        Ipsa expedita vero ab asperiores ratione quam saepe adipisci perspiciatis, est eaque corporis optio maiores dolor ad, nisi nam, sunt et officiis? Sequi doloremque unde ipsa illo sit eveniet nostrum?
        Provident ipsam delectus recusandae molestias veniam ullam, saepe accusamus nisi, labore culpa sequi odio, voluptatibus nulla suscipit nemo dolorum officia. Ratione dolorum ipsam, harum inventore nam ipsa ea aperiam quibusdam?"
        votes={-2}
        isDownvotedByUser
        isUpvotedByUser={false}
      />
    </div>
  );
};

export default Forum;
