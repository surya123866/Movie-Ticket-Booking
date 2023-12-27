import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { SkeletonTheme } from "react-loading-skeleton";
import "./App.css";
import MovieContext from "./Contexts/MovieContext";
import SignInModal from "./components/SignInModal";
import Booking from "./components/BookingPage";
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Account from "./components/AccountPage";
import Payment from "./components/PaymentPage";
import NotFound from "./components/Not-FoundPage";
import MovieDetails from "./components/MovieDeatils";
import Dashboard from "./components/AdminDashboard";
import Cookies from "js-cookie";

function App() {
  const [movies, changeState] = useState({
    ticketType: "",
    ticketQty: 0,
    ticketsPrice: 0,
    totalPrice: 0,
    totalSeatsSelected: 0,
    selectedSeats: [],
    bookedSeats: [12, 16, 18, 19, 20, 21, 22],
    SignInModal: false,
    userData: {
      email: "",
      password: "",
      userType: "",
    },
  });

  const setSignInModalOpen = () => {
    changeState({ ...movies, SignInModal: false });
  };

  const isUserLogedIn = Cookies.get("Token");
  const adminRoute = isUserLogedIn && movies.userData.userType === "admin";
  //console.log(adminRoute);

  return (
    <div className="App">
      <MovieContext.Provider value={{ movies, changeState }}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/booking/:movieName/:theaterName"
                element={<Booking />}
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/account" element={<Account />} />
              {adminRoute && (
                <Route path="/dashboard" element={<Dashboard />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SkeletonTheme>
        <SignInModal
          isOpen={movies.SignInModal}
          onRequestClose={() => setSignInModalOpen(false)}
        />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
