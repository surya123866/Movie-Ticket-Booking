import React from "react";
import Seat from "../Seat";
import "./styles.scss";

const SeatMatrix = () => {
  const GenerateSeats = (seatNumbers) => {
    return seatNumbers.map((seatNumber) => {
      return <Seat seatno={seatNumber} key={seatNumber} />;
    });
  };
  return (
    <div className="movie-complex">
      <div class="screen"></div>
      <div className="seats-container">
        <div className="movie-column-1">
          {<span>A</span>}
          {GenerateSeats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])}
        </div>
        <div className="movie-column-2">
          {<span>B</span>}
          {GenerateSeats([
            15, 16, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ])}
        </div>
        <div>
          <div className="movie-column-3">
            {<span>C</span>}
            {GenerateSeats([17, 18, 19, 20])}
          </div>
          <div className="movie-column-4">
            {<span>D</span>}
            {GenerateSeats([37, 38, 39, 40])}
          </div>
          <div className="movie-column-5">
            {<span>E</span>}
            {GenerateSeats([57, 58, 59, 60])}
          </div>
          <div className="movie-column-6">
            {<span>F</span>}
            {GenerateSeats([65, 66, 67, 68])}
          </div>
          <div className="movie-column-6">
            {<span>G</span>}
            {GenerateSeats([65, 66, 67, 68])}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SeatMatrix;
