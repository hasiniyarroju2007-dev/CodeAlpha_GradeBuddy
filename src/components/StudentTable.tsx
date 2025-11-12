import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Search, Users } from "lucide-react";
import { toast } from "sonner";

export interface Student {
  id: string;
  name: string;
  grade: number;
}

interface StudentTableProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
  onEditStudent: (id: string, name: string, grade: number) => void;
}

const StudentTable = ({ students, onDeleteStudent, onEditStudent }: StudentTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editGrade, setEditGrade] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return <Badge className="bg-success text-success-foreground">A</Badge>;
    if (grade >= 80) return <Badge className="bg-primary text-primary-foreground">B</Badge>;
    if (grade >= 70) return <Badge className="bg-secondary text-secondary-foreground">C</Badge>;
    if (grade >= 60) return <Badge className="bg-warning text-warning-foreground">D</Badge>;
    return <Badge variant="destructive">F</Badge>;
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditGrade(student.grade.toString());
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const gradeNum = parseFloat(editGrade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      toast.error("Please enter a valid grade (0-100)");
      return;
    }

    onEditStudent(id, editName.trim(), gradeNum);
    setEditingId(null);
    toast.success("Student updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditGrade("");
  };

  const handleDelete = (id: string, name: string) => {
    onDeleteStudent(id);
    toast.success(`${name} removed from tracker`);
  };

  return (
    <Card style={{ boxShadow: "var(--shadow-soft)" }}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Student List ({filteredStudents.length})
          </CardTitle>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm">Add your first student to get started</p>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Grade</TableHead>
                  <TableHead className="font-semibold">Letter</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">
                      {editingId === student.id ? (
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="max-w-xs"
                        />
                      ) : (
                        student.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === student.id ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={editGrade}
                          onChange={(e) => setEditGrade(e.target.value)}
                          className="max-w-[100px]"
                        />
                      ) : (
                        <span className="font-semibold">{student.grade.toFixed(1)}%</span>
                      )}
                    </TableCell>
                    <TableCell>{getGradeBadge(student.grade)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === student.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(student.id)}
                              className="h-8"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="h-8"
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(student)}
                              className="h-8 w-8 p-0"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(student.id, student.name)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTable;
