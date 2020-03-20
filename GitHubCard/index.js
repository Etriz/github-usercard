/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const createCard = ({ avatar_url, name, login, location, html_url, followers, following, bio }) => {
  const card = document.createElement("div");
  const userImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const userName = document.createElement("h3");
  const userLogin = document.createElement("p");
  const userLocation = document.createElement("p");
  const profile = document.createElement("p");
  const link = document.createElement("a");
  const followerCount = document.createElement("p");
  const followingCount = document.createElement("p");
  const userBio = document.createElement("p");

  card.append(userImg, cardInfo);
  cardInfo.append(
    userName,
    userLogin,
    userLocation,
    profile,
    followerCount,
    followingCount,
    userBio
  );
  profile.append(link);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  userName.classList.add("name");
  userLogin.classList.add("username");

  userImg.src = avatar_url;
  userName.textContent = name;
  userLogin.textContent = login;
  userLocation.textContent = `Location: ${location}`;
  // profile.textContent = `Profile: `;
  link.href = html_url;
  link.textContent = html_url;
  followerCount.textContent = `Followers: ${followers}`;
  followingCount.textContent = `Following: ${following}`;
  userBio.textContent = `Bio: ${bio}`;

  return card;
};

const addSearchForm = () => {
  const formDiv = document.createElement("div");
  const form = document.createElement("form");
  const searchLabel = document.createElement("label");
  const searchInput = document.createElement("input");
  const searchButton = document.createElement("button");

  // append
  formDiv.append(form);
  form.append(searchLabel, searchInput, searchButton);

  // add class
  formDiv.classList.add("form-div");

  // styles
  formDiv.style.width = "100%";
  form.style.width = "100%";
  form.style.display = "flex";
  form.style.justifyContent = "justify";
  form.style.marginBottom = "3rem";

  searchLabel.textContent = "Find User:";
  searchLabel.style.fontSize = "2.5rem";

  searchInput.style.borderRadius = "5px";
  searchInput.style.margin = "0 1rem";
  searchInput.style.flexGrow = "1";

  searchButton.textContent = "Search";
  searchButton.style.borderRadius = "5px";

  // add event listener
  const findUser = () => {
    event.preventDefault();
    let user = searchInput.value;
    getData(user);
    searchInput.value = "";
  };
  searchButton.addEventListener("click", findUser);

  return formDiv;
};
const header = document.querySelector(".header");
header.after(addSearchForm());
// let user = "";
const defaultUser = "etriz";
// const userSearch = user != "" ? user : defaultUser;
const cardsEntry = document.querySelector(".cards");
const getData = userSearch =>
  axios
    .get(`https://api.github.com/users/${userSearch}`)
    .then(res => {
      const line = document.createElement("hr");
      line.style.marginBottom = document.querySelector("form").style.marginBottom;
      while (cardsEntry.firstChild) cardsEntry.removeChild(cardsEntry.firstChild);
      cardsEntry.append(createCard(res.data), line);
    })
    .then(
      axios
        .get(`https://api.github.com/users/${userSearch}/following`)
        .then(res => {
          const data = res.data;
          // console.log("data", data);
          followersArray.length = 0;
          data.forEach(user => {
            followersArray.push(user.login);
            // console.log("followers", followersArray);
          });
          followersArray.forEach(item => {
            axios.get(`https://api.github.com/users/${item}`).then(res => {
              // console.log("second get", res);
              cardsEntry.append(createCard(res.data));
            });
          });
        })
        .catch(err => {
          console.log("error", err);
        })
    )
    .catch(err => {
      console.log("error", err);
    });
window.addEventListener("load", getData(defaultUser));
