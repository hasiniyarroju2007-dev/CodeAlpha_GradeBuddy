import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Award } from "lucide-react";
import StatCard from "@/components/StatCard";
import AddStudentForm from "@/components/AddStudentForm";
import StudentTable, { Student } from "@/components/StudentTable";

const Index = () => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (name: string, grade: number) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      grade,
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const editStudent = (id: string, name: string, grade: number) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, name, grade } : s))
    );
  };

  const calculateStats = () => {
    if (students.length === 0) {
      return {
        average: 0,
        highest: 0,
        lowest: 0,
      };
    }

    const grades = students.map((s) => s.grade);
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    const highest = Math.max(...grades);
    const lowest = Math.min(...grades);

    return { average, highest, lowest };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Student Grade Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage and analyze student performance with ease
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Average Grade"
            value={students.length > 0 ? `${stats.average.toFixed(1)}%` : "N/A"}
            icon={Award}
            variant="primary"
          />
          <StatCard
            title="Highest Score"
            value={students.length > 0 ? `${stats.highest.toFixed(1)}%` : "N/A"}
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Lowest Score"
            value={students.length > 0 ? `${stats.lowest.toFixed(1)}%` : "N/A"}
            icon={TrendingDown}
            variant="secondary"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AddStudentForm onAddStudent={addStudent} />
          </div>
          <div className="lg:col-span-2">
            <StudentTable
              students={students}
              onDeleteStudent={deleteStudent}
              onEditStudent={editStudent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
