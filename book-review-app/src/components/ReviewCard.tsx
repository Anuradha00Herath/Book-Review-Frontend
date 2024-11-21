import React from "react";
import { useNavigate } from "react-router-dom";

interface ReviewCardProps {
  id:string,
  title: string;
  author: string;
  rating: number;
  comment: string;
  addedOn: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  title,
  author,
  rating,
  comment,
  addedOn,
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/review/${id}`)} className="bg-white shadow-md p-6 rounded-lg cursor-pointer">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">by {author}</p>
      <p className="text-yellow-500">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </p>
      <p className="mt-2">{comment}</p>
      <p className="text-gray-500 text-sm mt-2">Added on: {addedOn}</p>
    </div>
  );
};

export default ReviewCard;
