import { STORAGE_KEY } from "@/constant";
import { Auth, Dashboard } from "@/layouts";
import CreateAreaPage from "@/pages/CreateArea/pages/Create-Area-Page";
import CreateBlog from "@/pages/CreateBlog/pages/Create-Blog";
import EditAreaPage from "@/pages/EditArea/pages/Edit-Area-Page";
import EditBlogPage from "@/pages/EditBlog/pages/Edit-Blog-Page";
import EditUserPage from "@/pages/EditUser/pages/Edit-User-Page";
import { getLocalStorage } from "@/utils";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
      <Route path="/dashboard/create-area" element={<CreateAreaPage />} />
      <Route path="/dashboard/edit-user/:slug" element={<EditUserPage />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/edit-place/:name" element={<EditBlogPage />} />
      <Route path="/dashboard/edit-area/:name" element={<EditAreaPage />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
