const db = require("./connection");
const { User, Complaints } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Complaints", "complaints");
  await cleanDB("User", "users");
//seed data
  const complaints = await Complaints.insertMany([
     // 0
  {
      title: "Brave Karen fights minimum wage workers",
      description:
        "Ordered 6 nuggies, only got 5!!  Should i sue maccas? Is this a hate crime?",
      category: "Food",
      username: "karen007",
      image: "",
      date: "06/06/23",
      votes: 12,
      comments: [
        {
          author: "kalid",
          description: "This is un-australian",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Boycot Maccas",
          image: "",
          link: "",
        },
      ],
    },
     // 1
    {
      title: "Co-worker attempted murder by starvation!",
      description: "My mate stole my lunch, should i eat him?",
      image: "",
      category: "Work",
      username: "kalid",
      date: "05/05/23",
      votes: 10,
      comments: [
        {
          author: "kalid",
          description: "They should be fired",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Quit",
          image: "",
          link: "",
        },
      ],
    },
     // 2
    {
      title: "Why are workers so lazy?",
      description: "I want my workers to work 18 hours a day but they refused?",
      image: "",
      category: "Work",
      username: "kindBoss",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "They should be fired",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Back in my day we sent kids to work 23 hours a day",
          image: "",
          link: "",
        },
      ],
    },
     // 3
    {
      title: "My 9 year old daughter refuses to pay rent",
      description:
        "Inflation is high but my daughter hasn't paid rent in 9 years now!! should i call the police?",
      image: "",
      category: "Finance",
      username: "karen007",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "What a bum!!",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Kids these days don't know hard work",
          image: "",
          link: "",
        },
        {
          author: "kindBoss",
          description: "Too much smashed avocado",
          image: "",
          link: "",
        },
      ],
    },
     // 4
    {
      title: "Apple releases Iphone 999 WITHOUT CHARGING PORT",
      description: "CEO says SUCKS FOR YOU GUYS",
      image: "",
      category: "Technology",
      username: "karen007",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "Phones are evil!!",
          image: "",
          link: "",
        },
      ],
    },
     // 5
    {
      title: "Is my doctor fat shaming my cat?",
      description:
        "My vegan cat hasn't been moving for about a month now and i think my Dr is really rude using words like is she dead or is the cat alseep",
      image: "",
      category: "Health",
      username: "karen007",
      date: "05/05/23",
      votes: 1,
      comments: [
        {
          author: "kalid",
          description: "What a bum!!",
          image: "",
          link: "",
        },
      ],
    },
     // 6
    {
      title: "Is it rude to eat my neighbour's baby?",
      description: "My neighbour was slightly annoyed, Thoughts?",
      image: "",
      category: "Random",
      username: "brian",
      date: "05/05/23",
      votes: 4,
      comments: [
        {
          author: "karen007",
          description: "The neighbours seem rude",
          image: "",
          link: "",
        },
      ],
    },
     // 7
    {
      title: "WORLD'S YOUNGEST BABY JUST BORN",
      description:
        "My baby was born without clothes, did the doctor steal them?",
      image: "",
      category: "Life",
      username: "kalid",
      date: "01/01/19",
      votes: 2,
      comments: [
        {
          author: "kalid",
          description: "I'm younger than the baby",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Kids these days don't know hard work",
          image: "",
          link: "",
        },
        {
          author: "kindBoss",
          description: "Doctors should work for free",
          image: "",
          link: "",
        },
      ],
    },
     // 8
    {
      title: "Infant Unemployment rate hits record low",
      description: "CEOs rejoice as more babies return to the workplace",
      image: "",
      category: "General",
      username: "kindBoss",
      date: "01/01/19",
      votes: 2,
      comments: [
        {
          author: "kalid",
          description: "I'm younger than the baby",
          image: "",
          link: "",
        },
        {
          author: "jblan",
          description: "Kids these days don't know hard work",
          image: "",
          link: "",
        },
        {
          author: "kindBoss",
          description: "NICE",
          image: "",
          link: "",
        },
      ],
    },
  ]);
  console.log("users complaints");

  await User.create({
    username: "jblan",
    email: "jay@gmail.com",

    password: "abcd1234",
    isModerator: true,
    complaints: [],
  });

  await User.create({
    username: "admin",
    email: "admin@gmail.com",

    password: "abcd1234",
    isModerator: true,
    complaints: [],
  });

  await User.create({
    username: "kalid",
    email: "kalid@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[1]._id, complaints[6]._id],
  });

  await User.create({
    username: "brian",
    email: "brian@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[7]._id],
  });

  await User.create({
    username: "karen007",
    email: "karen007@gmail.com",

    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[0]._id, complaints[3]._id, complaints[4]._id, complaints[5]._id],
  });

  await User.create({
    username: "kindBoss",
    email: "kindboss@gmail.com",
    password: "abcd1234",
    isModerator: false,
    complaints: [complaints[2]._id, complaints[8]._id],
  });

  console.log("users seeded");
  process.exit();
});
