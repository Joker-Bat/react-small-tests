import React, { useState } from "react";

// Styles
import classes from "./Rating.module.scss";

const Rating = () => {
  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewTitle, setReviewTitle] = useState("your review");

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
    switch (+value) {
      case 1:
        setReviewTitle("I Hate it");
        break;
      case 2:
        setReviewTitle("Average Product");
        break;
      case 3:
        setReviewTitle("satisfied");
        break;
      case 4:
        setReviewTitle("I just like it");
        break;
      case 5:
        setReviewTitle("I just love it");
        break;
      default:
        setReviewTitle("Your Review");
        break;
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
    if (currentValue) {
      setReviewTitle((prev) => prev);
    } else {
      setReviewTitle("Your Review");
    }
  };

  return (
    <main className={classes.Rating}>
      <div className={classes.RatingContainer}>
        <h1 className={classes.Title}>Rating</h1>
        <div className={classes.StarContainer}>
          {stars.map((_, index) => {
            const starClass = [
              classes.Star,
              (currentValue || hoverValue) > index && classes.Active,
              currentValue === 5 && classes.FullStar,
            ];
            return (
              <span
                key={`Star${index}`}
                className={starClass.join(" ")}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <i className="fas fa-star"></i>
              </span>
            );
          })}
        </div>
        <h1 className={classes.ReviewTitle}>{reviewTitle}</h1>
        <form className={classes.FormContainer}>
          <textarea cols="30" rows="5"></textarea>
          <button>post</button>
        </form>
      </div>
    </main>
  );
};

export default Rating;
