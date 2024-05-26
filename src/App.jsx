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
import CreateKindPage from "@/pages/CreateKind/pages/Create-Kind-Page";
import EditKindPage from "@/pages/EditKind/pages/Edit-Kind-Page";
import CreateConveniencePage from "@/pages/CreateConvenience/pages/Create-Convenience-Page";
import EditConveniencePage from "@/pages/EditConvenience/pages/Edit-Convenience-Page";
import CreatePurposePage from "@/pages/CreatePurpose/pages/Create-Purpose-Page";
import EditPurposePage from "@/pages/EditPurpose/pages/Edit-Purpose-Page";

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
      <Route path="/dashboard/create-kind" element={<CreateKindPage />} />
      <Route path="/dashboard/create-purpose" element={<CreatePurposePage />} />
      <Route
        path="/dashboard/create-convenience"
        element={<CreateConveniencePage />}
      />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/edit-user/:slug" element={<EditUserPage />} />
      <Route path="/dashboard/edit-place/:name" element={<EditBlogPage />} />
      <Route path="/dashboard/edit-area/:name" element={<EditAreaPage />} />
      <Route path="/dashboard/edit-kind/:name" element={<EditKindPage />} />
      <Route
        path="/dashboard/edit-purpose/:name"
        element={<EditPurposePage />}
      />
      <Route
        path="/dashboard/edit-convenience/:name"
        element={<EditConveniencePage />}
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
