
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableColumn {
  key: string;
  header: string;
}

interface ResearchTableProps {
  caption?: string;
  columns: TableColumn[];
  data: Record<string, string | number>[];
}

export function ResearchTable({ caption, columns, data }: ResearchTableProps) {
  return (
    <Table className="border border-gray-700">
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className="bg-gray-800 text-white">
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {columns.map((column) => (
              <TableCell key={`${i}-${column.key}`} className="border-t border-gray-700">
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
