import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import CreateBlog from "@/pages/CreateBlog/pages/Create-Blog";
import EditBlogPage from "@/pages/EditBlog/pages/Edit-Blog-Page";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/create-blog" element={<CreateBlog />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/edit-place/:name" element={<EditBlogPage />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
