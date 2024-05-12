package com.example.demo.service.impl;

import com.example.demo.domain.dto.StudentPointInClassroomDTO;
import com.example.demo.repo.ClassroomRepo;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.StudentService;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.List;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPDFExporter {
  @Autowired
  private CourseRepo courseRepo;
  @Autowired
  private ClassroomRepo classroomRepo;

  //export excel
  private void writeTableHeader(PdfPTable table) {
    PdfPCell cell = new PdfPCell();
    cell.setBackgroundColor(Color.BLUE);
    cell.setPadding(5);

    FontFactoryImp factory = new FontFactoryImp();

    Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
    font.setColor(Color.WHITE);

    cell.setPhrase(new Phrase("Mã sinh viên", font));

    table.addCell(cell);

    cell.setPhrase(new Phrase("Họ tên", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Khóa", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Lớp", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Điểm thường xuyên 1", font));
    table.addCell(cell);
    cell.setPhrase(new Phrase("Điểm thường xuyên 2", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Điểm giữa kỳ", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("TB kiểm tra TX", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Điểm thi", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Điểm 4 tích lũy ", font));
    table.addCell(cell);

    cell.setPhrase(new Phrase("Điểm 10 tích lũy ", font));
    table.addCell(cell);
  }

  private void writeTableData(PdfPTable table, List<StudentPointInClassroomDTO> listUser) {
    for (StudentPointInClassroomDTO student : listUser) {
      table.addCell(String.valueOf(student.getStudentCode()));
      table.addCell(student.getStudentName());
      table.addCell(courseRepo.getCourseNameByStudentCode(student.getStudentCode()));
      table.addCell(classroomRepo.getNameClassByStudentCode(student.getStudentCode()));
      table.addCell(String.valueOf(student.getRegularPointOne()));
      table.addCell(String.valueOf(student.getRegularPointTwo()));
      table.addCell(String.valueOf(student.getMidtermPointOne()));
      table.addCell(String.valueOf(student.getMediumPoint()));
      table.addCell(String.valueOf(student.getTestPointOne()));
      table.addCell(String.valueOf(student.getAccumulated_point()));
      table.addCell(String.valueOf(student.getPoint()));
    }
  }
  public void export(HttpServletResponse response, List<StudentPointInClassroomDTO> listUser) throws DocumentException, IOException {
    Document document = new Document(PageSize.A2);
    PdfWriter.getInstance(document, response.getOutputStream());

    document.open();
    Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
    font.setSize(18);
    font.setColor(Color.BLUE);

    Paragraph p = new Paragraph("Danh sách điểm : ", font);
    p.setAlignment(Paragraph.ALIGN_CENTER);

    document.add(p);

    PdfPTable table = new PdfPTable(11);
    table.setWidthPercentage(100f);
    table.setWidths(new float[] {10.0f, 10.0f, 5.0f, 5.0f, 10.0f, 10.0f, 10.0f, 10.0f, 10.0f, 10.0f, 10.0f});
    table.setSpacingBefore(10);

    writeTableHeader(table);
    writeTableData(table, listUser);

    document.add(table);

    document.close();

  }
}
