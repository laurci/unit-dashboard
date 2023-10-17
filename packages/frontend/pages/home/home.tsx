import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-2">Home page</h1>
      <Link to="/user">Go to user</Link>
      <div className="bg-red-300">
        <Outlet />
      </div>
    </div>
  );
}
