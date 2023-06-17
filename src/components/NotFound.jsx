import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return <div className="not-found">
    <h1>Card not found</h1>
    <button onClick={handleClick}>Home</button>
  </div>;
};

export default NotFound;
