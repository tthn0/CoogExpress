import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <h1>Shitty Dashboard</h1>
      <p>Welcome back, {user.first_name}.</p>
      <button onClick={logout}>Logout</button>
      <h3>User Info</h3>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(user).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
