import { useEffect, useState } from "react";
import { getProfile, updateUser, deleteUser } from "../../services/api.jsx";
import UserProfile from "./UserProfile.jsx";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile(token);
      setUser(profile);
    };
    fetchProfile();
  }, [token]);

  const handleUpdate = async (updatedUser) => {
    const updated = await updateUser(user._id, updatedUser, token);
    setUser(updated);
  };

  const handleDelete = async () => {
    await deleteUser(user._id, token);
    localStorage.removeItem("token");
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <UserProfile user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
  );
}