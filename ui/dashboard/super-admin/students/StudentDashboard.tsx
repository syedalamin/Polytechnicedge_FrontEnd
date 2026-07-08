import StudentHeader from "./StudentHeader";
import StudentStats from "./StudentStats";
import StudentList from "./StudentList";

const StudentDashboard = () => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <StudentHeader />
        <StudentStats />
        <StudentList />
      </div>
    </div>
  );
};

export default StudentDashboard;
