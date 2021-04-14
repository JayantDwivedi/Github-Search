import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

// context make
const GithubContext = React.createContext();

// Provider , Consumer - GithubContext.Provider

// this is seprate compoenent
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // request loading
  const [requests, setRequests] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  // Error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // console.log(user);
    //toggle error
    toggleError(false, "");
    setIsLoading(true);

    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => {
        console.log(err);
      });

    // console.log(response);

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      // repos
      await axios
        .get(`${rootUrl}/users/${login}/repos?per_page=100`)
        .then((response) => setRepos(response.data));

      // followers
      await axios
        .get(`${followers_url}?per_page=100`)
        .then((response) => setFollowers(response.data));

      // optional to load whole at one time
      // await Promise.allSettled([
      //   await axios.get(`${followers_url}?per_page=100`),
      //   axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
      // ])
      //   .then((results) => {
      //     const [repos, followers] = results;
      //     const status = "fulfilled";
      //     if (repos.status === status) {
      //       setRepos(repos.value.data);
      //     }
      //     if (followers.status === status) {
      //       setFollowers(followers.value.data);
      //     }
      //   })
      //   .catch((err) => console.log(err));

      // more logic
      // repos
      // https://api.github.com/users/JayantDwivedi/repos?per_page=100
      // https://api.github.com/users/JayantDwivedi/followers
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };
  // Check Total Request
  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        // remaining = 0;

        setRequests(remaining);
        if (remaining === 0) {
          // throw error
          toggleError(true, "sorry you have exceeded hourly limit!");
        }
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to seting up error
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  // Use Effect
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isloading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
