import { useDispatch } from "react-redux";
import { addFavorite } from "../../redux/favoriteSlice";
import { useSelector } from "react-redux";
import "./UserCard.css"; 


const UserCard = ({ user }) => {
  const dispatch = useDispatch();
const favorites = useSelector((state) => state.favorites.items);
const isFavorite = favorites.some((item) => item.id === user.id);
  const handleFavorite = () => {
    dispatch(addFavorite(user));
  };

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.company.name}</p>

      <button onClick={handleFavorite} disabled={isFavorite}>
        {isFavorite ? "Added" : "Add to Favorites"}
      </button>
    </div>
  );
};
export default UserCard;