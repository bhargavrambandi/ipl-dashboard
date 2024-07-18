package com.bhargav.ipldashboard.service;

import org.springframework.data.repository.CrudRepository;

import com.bhargav.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long>  {

    Team findByTeamName(String teamName);
    
}
