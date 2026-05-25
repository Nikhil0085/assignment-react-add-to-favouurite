import { useState, useEffect } from "react";
import UserCard from './assets/components/UserCard'
import { useSelector } from "react-redux";
import './App.css'
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, [])
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

    if (loading) {
      return <h2>Loading...</h2>;
    }
{
  filteredUsers.length === 0 ? (
    <h2>No users found</h2>
  ) : (
    filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
  );
}
  
  return (
    <div>
     
      <input
        type="text"
        placeholder="🔍 Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      
      <h2 style={{ textAlign: "center" }}>⭐ Favorite Users</h2>

      <div className="container">
        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>

     
      <h2 style={{ textAlign: "center" }}>👥 All Users</h2>

      <div className="container">
        {filteredUsers.length === 0 ? (
          <h3>No users found</h3>
        ) : (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}

export default App
