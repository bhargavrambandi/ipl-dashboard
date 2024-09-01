package com.bhargav.ipldashboard.service;

import org.springframework.data.repository.CrudRepository;

import com.bhargav.ipldashboard.model.Team;
import java.util.List;


public interface TeamRepository extends CrudRepository<Team, Long>  {

    Team findByTeamName(String teamName);
    
<<<<<<< Updated upstream
     List<Team> findAll();

    
=======
    List<Team> findAll();
>>>>>>> Stashed changes
}
