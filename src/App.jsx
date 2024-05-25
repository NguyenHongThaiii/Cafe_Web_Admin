import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import CreateBlog from "@/pages/CreateBlog/pages/Create-Blog";
import EditBlogPage from "@/pages/EditBlog/pages/Edit-Blog-Page";
import { getLocalStorage } from "@/utils";
import { STORAGE_KEY } from "@/constant";
import { useEffect } from "react";
import EditUserPage from "@/pages/EditUser/pages/Edit-User-Page";

function App() {
  const navigate = useNavigate();
  const isLogin = JSON.parse(getLocalStorage(STORAGE_KEY.USER))?.id;
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/sign-in");
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/create-blog" element={<CreateBlog />} />
      <Route path="/dashboard/edit-user/:slug" element={<EditUserPage />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/edit-place/:name" element={<EditBlogPage />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
