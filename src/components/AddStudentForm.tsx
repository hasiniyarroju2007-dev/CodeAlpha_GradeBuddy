import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

interface AddStudentFormProps {
  onAddStudent: (name: string, grade: number) => void;
}

const AddStudentForm = ({ onAddStudent }: AddStudentFormProps) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter a student name");
      return;
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error("Please enter a valid grade (0-100)");
      return;
    }

    onAddStudent(name.trim(), gradeNum);
    setName("");
    setGrade("");
    toast.success(`${name} added successfully!`);
  };

  return (
    <Card style={{ boxShadow: "var(--shadow-soft)" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Add New Student
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade (0-100)</Label>
            <Input
              id="grade"
              type="number"
              placeholder="Enter grade"
              min="0"
              max="100"
              step="0.01"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Student
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStudentForm;
