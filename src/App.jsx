import { STORAGE_KEY } from "@/constant";
import { Auth, Dashboard } from "@/layouts";
import CreateAreaPage from "@/pages/CreateArea/pages/Create-Area-Page";
import CreateBlog from "@/pages/CreateBlog/pages/Create-Blog";
import CreateConveniencePage from "@/pages/CreateConvenience/pages/Create-Convenience-Page";
import CreateKindPage from "@/pages/CreateKind/pages/Create-Kind-Page";
import CreatePurposePage from "@/pages/CreatePurpose/pages/Create-Purpose-Page";
import EditAreaPage from "@/pages/EditArea/pages/Edit-Area-Page";
import EditBlogPage from "@/pages/EditBlog/pages/Edit-Blog-Page";
import EditConveniencePage from "@/pages/EditConvenience/pages/Edit-Convenience-Page";
import EditKindPage from "@/pages/EditKind/pages/Edit-Kind-Page";
import EditPurposePage from "@/pages/EditPurpose/pages/Edit-Purpose-Page";
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
import {
  Areas,
  Blogs,
  Conveniences,
  Home,
  Kinds,
  Loggers,
  Purposes,
  Users,
} from "./pages/dashboard";

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
      <Route
        path="/dashboard"
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/blogs"
        element={
          <Dashboard>
            <Blogs />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <Dashboard>
            <Users />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/areas"
        element={
          <Dashboard>
            <Areas />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/kinds"
        element={
          <Dashboard>
            <Kinds />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/conveniences"
        element={
          <Dashboard>
            <Conveniences />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/purposes"
        element={
          <Dashboard>
            <Purposes />
          </Dashboard>
        }
      />
      <Route
        path="/dashboard/loggers"
        element={
          <Dashboard>
            <Loggers />
          </Dashboard>
        }
      />

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
