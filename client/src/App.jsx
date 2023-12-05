import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { Outlet } from "react-router-dom";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
//instantiate Apolloclient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//Outlet component added to coniditionally swap between the different pages depending on the URL
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
};

export default App;
