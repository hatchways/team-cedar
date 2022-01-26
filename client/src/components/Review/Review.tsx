import React, { useEffect, useState } from 'react';
import { Stack, Typography, Rating } from '@mui/material';
import { RatingData } from '../../interface/RatingData';
import { SxProps, Theme } from '@mui/system';

interface ReviewProps {
  readOnly: boolean;
  ratingValues?: RatingData[];
  reviewContent?: string;
  contentStyles?: SxProps<Theme>;
  ratingStyles?: SxProps<Theme>;
  onChangeRating?: (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => void;
  onChangeRatingValue?: number | null;
}

const Review = ({
  readOnly,
  ratingValues,
  reviewContent,
  contentStyles,
  onChangeRatingValue,
  onChangeRating,
  ratingStyles,
}: ReviewProps): JSX.Element => {
  const [rating, setRating] = useState<number | null>(null);
  useEffect(() => {
    const calculateAvgRating = () => {
      const ratingSum = ratingValues!.reduce((sum, ratingObj) => {
        return sum + Number(ratingObj.rating);
      }, 0);
      const getAvgRating = ratingSum / ratingValues!.length;
      setRating(getAvgRating);
    };
    if (ratingValues?.length) {
      calculateAvgRating();
    } else {
      setRating(null);
    }
  }, [ratingValues]);
  return (
    <Stack direction="column" spacing={1}>
      {readOnly ? (
        <Rating name="user-rating" value={rating} sx={ratingStyles} readOnly max={5} precision={0.5} />
      ) : (
        <Rating name="user-rating" value={onChangeRatingValue} onChange={onChangeRating} max={5} precision={0.5} />
      )}
      {reviewContent && <Typography sx={contentStyles}>{reviewContent}</Typography>}
    </Stack>
  );
};

export default Review;
