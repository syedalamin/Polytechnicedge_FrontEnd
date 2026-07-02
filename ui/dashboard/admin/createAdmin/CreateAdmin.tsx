import CreateAdminHeader from "./Header";
import RoleStatus from "./RoleStatus";

 

const CreateAdminDashboard = () => {
  return (
    <div className=" w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <CreateAdminHeader />
        <RoleStatus />
      </div>
    </div>
  );
};

export default CreateAdminDashboard;
