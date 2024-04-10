package com.example.demo.repo;

import com.example.demo.domain.model.ProcessFileImport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessFileImportRepo extends JpaRepository<ProcessFileImport, Long> {
  List<ProcessFileImport> getProcessFileImportsByStatus(Integer status);
  List<ProcessFileImport> findAllByStatusInOrderByCreateDatetimeDesc(List<Integer> statusList);
}
