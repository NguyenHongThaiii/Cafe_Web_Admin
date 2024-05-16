import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
LayoutUser.propTypes = {};

function LayoutUser({ children }) {
  return (
    <div>
      <div className="p-4">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
      </div>
      {children}
      <div className="text-blue-gray-600 p-4">
        <Footer />
      </div>
    </div>
  );
}

export default LayoutUser;
